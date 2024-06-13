import { Route , Routes } from 'react-router-dom'
import Login from '../../pages/provider/authentication/Login'
import SignUp from '../../pages/provider/authentication/SignUp'
import { LandingProvider } from '../../pages/provider/Landing/LandingProvider'
import DefaultContent from '../../component/provider/default/DefaultContent'
import { ProviderHome } from "../../pages/provider/Home/ProviderHome"
import { ProviderAuthRoute } from './ProviderAuthRoute'
import  AddLocation  from '../../pages/provider/Spaces/AddLocation'
import  AddSpaceDetails  from '../../pages/provider/Spaces/AddSpaceDetails'
import AddSpacePage from '../../pages/provider/Spaces/AddSpacePage'
import Profile from "../../pages/provider/profile/Profile"


export function ProviderRoutes(){
    return(
        <Routes>
            <Route path='/' element={<LandingProvider/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/*' element={<ProviderAuthRoute/>} >
                <Route path='home' element={<ProviderHome/>} />
                {/* <Route path='addLocation' element={<AddLocation/>} />
                <Route path='addSpaceDetails' element={<AddSpaceDetails/>} /> */}
                 <Route path='addSpace' element={<AddSpacePage />}>
                    <Route index element={<DefaultContent />} />
                    <Route path='addLocation' element={<AddLocation />} />
                    <Route path='addSpaceDetails' element={<AddSpaceDetails />} />
                </Route>
                
            </Route>
            <Route path='profile' element={<Profile/>} />
            {/* <Route path='/addSpace' element={} */}
        </Routes>
    )
}