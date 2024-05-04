
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserRoutes } from './routes/userRoutes/UserRoutes'
import { ProviderRoutes } from './routes/providerRoutes/ProviderRoutes'
import './App.css'

function App() {


  return (
    <>
      <Router>
         <Routes>
            <Route path='/user/*' element={<UserRoutes/>} />
            <Route path='/provider/*' element={<ProviderRoutes/>}/>
         </Routes>
      </Router>
    </>
  )
}

export default App
