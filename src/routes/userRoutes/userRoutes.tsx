import { Route , Routes, Navigate  } from 'react-router-dom'
import SignUp from '../../pages/user/authentication/SignUp'
import Login from '../../pages/user/authentication/Login'
import {UserHome} from '../../pages/user/home/UserHome'
import { UserAuthRoute } from './UserAuthRoute'
import { ResetPassword }  from '../../pages/user/authentication/ResetPassword'
import Spaces from '../../pages/user/spaces/Spaces'
import Profile from "../../pages/user/profile/Profile"
import SpaceDetails from "../../pages/user/spaces/SpaceDetails"
import Checkout from "../../pages/user/payment/Checkout"
import { RootState } from "../../app/store";
import { useSelector} from "react-redux";
import  ErrorPage  from '../../pages/user/errorPages/ErrorPage'
import Bookings from '../../pages/user/bookings/Bookings'
import BookingDetails from '../../pages/user/bookings/BookingDetails'; // Import the new component
import Wallet from '../../pages/user/wallet/Wallet'


export function UserRoutes(){

    const { userInfo } = useSelector((state:RootState) => state.auth);

    return(
        <Routes>
            <Route path="/" element={<UserHome />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={userInfo ? <Navigate to="/home" /> : <Login />} />
      <Route path="/spaces" element={<Spaces />} />
      <Route path="/spaceDetails" element={<SpaceDetails />} />
      <Route path="/resetPassword/:email/:token" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<UserAuthRoute />}>
        <Route path="/home" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookingDetails/:id" element={<BookingDetails />} /> 
        <Route path="/wallet" element={<Wallet />} />
      </Route>

      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}