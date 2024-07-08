import { Route , Routes } from 'react-router-dom'
import Login from '../../pages/provider/authentication/Login'
import SignUp from '../../pages/provider/authentication/SignUp'
import { LandingProvider } from '../../pages/provider/landing/LandingProvider'
import DefaultContent from '../../component/provider/default/DefaultContent'
import { ProviderHome } from "../../pages/provider/home/ProviderHome"
import { ProviderAuthRoute } from './ProviderAuthRoute'
import  AddLocation  from '../../pages/provider/spaces/AddLocation'
import  AddSpaceDetails  from '../../pages/provider/spaces/AddSpaceDetails'
import AddSpacePage from '../../pages/provider/spaces/AddSpacePage'
import Profile from "../../pages/provider/profile/Profile"
import SpacesPage from  '../../pages/provider/spaces/SpacesPage'
import SpacePageDetails from  "../../pages/provider/spaces/SpacePageDetails"


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
                    <Route path='currentSpaces' element={<SpacesPage/>} />
                    <Route path='currentSpaces/mySpaceDetails' element={<SpacePageDetails />} />
                </Route>
            
                
            </Route>
            <Route path='profile' element={<Profile/>} />
            {/* <Route path='/addSpace' element={} */}
        </Routes>
    )
}