
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './routes/userRoutes/UserRoutes'
import { ProviderRoutes } from './routes/providerRoutes/ProviderRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {


  return (
    <>
      <Router>
        <div>
        <ToastContainer autoClose={3000} />
          <Routes>
              <Route path='/user/*' element={<UserRoutes/>} />
              <Route path='/provider/*' element={<ProviderRoutes/>}/>
          </Routes>
         </div>
      </Router>
    </>
  )
}

export default App
