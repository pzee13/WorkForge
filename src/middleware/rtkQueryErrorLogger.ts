import { Middleware, MiddlewareAPI, Dispatch, isRejectedWithValue, SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import { userLogout } from '../slices/authSlice'; // Import your logout action
import { RootState } from '../app/store'

interface RejectedActionPayload {
  status: number;
  data?: {
    message: string;
  };
}

interface RejectedAction extends PayloadAction<unknown, string, { arg: unknown; requestId: string; requestStatus: 'rejected'; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})), SerializedError> {
  payload: RejectedActionPayload;
}

const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI<Dispatch, RootState>) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const rejectedAction = action as RejectedAction;
    if (rejectedAction.payload.status === 403 && rejectedAction.payload.data?.message === 'User blocked') {
      // Clear cookies
      document.cookie.split(';').forEach((c) => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      // Clear local storage
      localStorage.clear();

      // Clear session storage
      sessionStorage.clear();

      // Dispatch logout action
      api.dispatch(userLogout());

      // Redirect to login page or show a message
      toast.error('Your account has been blocked. Please contact support.');
      window.location.href = '/login';
    }
  }
  return next(action);
};

export default rtkQueryErrorLogger;
