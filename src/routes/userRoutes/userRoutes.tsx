import { Route , Routes } from 'react-router-dom'
import { Landing } from '../../pages/user/Landing/Landing'


export function UserRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Landing/>}/>
        </Routes>
    )
}