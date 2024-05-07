import { Route , Routes } from 'react-router-dom'

import AdminLogin from '../../pages/admin/authentication/AdminLogin'





export function AdminRoutes(){


    return (
        <Routes>
            <Route path='/login' element={<AdminLogin/>}/>
            
        </Routes>
    )
}