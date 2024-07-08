import { Route , Routes, Navigate  } from 'react-router-dom'
import { Landing } from '../../pages/user/landing/Landing'
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


export function UserRoutes(){

    const { userInfo } = useSelector((state:RootState) => state.auth);

    return(
        <Routes>
            <Route path="/" element={<Landing />} />
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
      </Route>

      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}