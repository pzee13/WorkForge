import { Route , Routes } from 'react-router-dom'
import { Landing } from '../../pages/user/Landing/Landing'
import SignUp from '../../pages/user/authentication/SignUp'
import Login from '../../pages/user/authentication/Login'


export function UserRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}