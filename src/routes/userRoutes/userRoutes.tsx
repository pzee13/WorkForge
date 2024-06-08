import { Route , Routes } from 'react-router-dom'
import { Landing } from '../../pages/user/Landing/Landing'
import SignUp from '../../pages/user/authentication/SignUp'
import Login from '../../pages/user/authentication/Login'
import {UserHome} from '../../pages/user/home/UserHome'
import { UserAuthRoute } from './UserAuthRoute'
import { ResetPassword }  from '../../pages/user/authentication/ResetPassword'
import Spaces from '../../pages/user/spaces/Spaces'
import Profile from "../../pages/user/profile/Profile"
import SpaceDetails from "../../pages/user/spaces/SpaceDetails"
import Checkout from "../../pages/user/Payment/Checkout"

export function UserRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/resetPassword/:email/:token' element={<ResetPassword/>} />
            <Route path='/spaces' element={<Spaces/>} />
            <Route path='/spaces/spaceDetails' element={<SpaceDetails/>} />
            <Route path='/*' element={<UserAuthRoute />}>
                <Route path='home' element={<UserHome />} />
                <Route path="profile" element={<Profile/>} />
                <Route path='spaces/spaceDetails/checkout' element={<Checkout/>} />
            </Route>
        </Routes>
    )
}