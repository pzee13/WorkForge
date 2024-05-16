import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <React.StrictMode>
      <Provider store={store}>
      <GoogleOAuthProvider clientId="345257050790-c1n9m6sl7skqar68m4d3c1c1dirlsh8u.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </Provider>
    </React.StrictMode>
  
)
