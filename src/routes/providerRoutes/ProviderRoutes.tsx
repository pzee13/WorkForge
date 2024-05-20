import { Route , Routes } from 'react-router-dom'
import Login from '../../pages/provider/authentication/Login'
import SignUp from '../../pages/provider/authentication/SignUp'
import { LandingProvider } from '../../pages/provider/Landing/LandingProvider'
import { ProviderHome } from "../../pages/provider/Home/ProviderHome"
import { ProviderAuthRoute } from './ProviderAuthRoute'
import { AddLocation } from '../../pages/provider/Spaces/AddLocation'
import  AddSpaceDetails  from '../../pages/provider/Spaces/AddSpaceDetails'
import Profile from "../../pages/provider/profile/Profile"


export function ProviderRoutes(){
    return(
        <Routes>
            <Route path='/' element={<LandingProvider/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/*' element={<ProviderAuthRoute/>} >
                <Route path='home' element={<ProviderHome/>} />
                <Route path='addLocation' element={<AddLocation/>} />
                <Route path='addSpaceDetails' element={<AddSpaceDetails/>} />
                <Route path='profile' element={<Profile/>} />
            </Route>
            {/* <Route path='/addSpace' element={} */}
        </Routes>
    )
}