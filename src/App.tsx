
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './routes/userRoute/UserRoutes'
import { ProviderRoutes } from './routes/providerRoutes/ProviderRoutes'
import  {AdminRoutes}  from './routes/adminRoutes/AdminRoutes';
import { ToastContainer } from "react-toastify";
import { Helmet } from 'react-helmet';
import logo from './assets/images/Set Space-logo/svg/logo-no-background.svg';
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {


  return (
    <>
      <Router>
      <Helmet>
          <link rel="icon" type="image/png" href={logo} />
        </Helmet>
        
        <ToastContainer autoClose={3000} />
          <Routes>
              <Route path='/*' element={<UserRoutes/>} />
              <Route path='/provider/*' element={<ProviderRoutes/>}/>
              <Route path='/admin/*' element={<AdminRoutes/>} />
          </Routes>
       
      </Router>
    </>
  )
}

export default App
 