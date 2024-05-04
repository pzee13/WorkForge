import { Route , Routes } from 'react-router-dom'
import Login from '../../pages/provider/authentication/Login'
import SignUp from '../../pages/provider/authentication/SignUp'
import { LandingProvider } from '../../pages/provider/Landing/LandingProvider'


export function ProviderRoutes(){
    return(
        <Routes>
            <Route path='/' element={<LandingProvider/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<SignUp/>}/>
            {/* <Route path='/addSpace' element={} */}
        </Routes>
    )
}