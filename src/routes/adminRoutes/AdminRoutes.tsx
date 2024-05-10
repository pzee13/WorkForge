import { Route , Routes } from 'react-router-dom'
import Layout from '../../component/admin/layout/Layout'
import AdminLogin from '../../pages/admin/authentication/AdminLogin'
import AdminAuthRoutes from './AdminAuthRoutes'




export function AdminRoutes(){


    return (
        <Routes>
            <Route path='/login' element={<AdminLogin/>}/>
            <Route path='*' element={<AdminAuthRoutes/>} >
                <Route path='*' element={<Layout/>} />
            </Route>
        </Routes>
    )
}