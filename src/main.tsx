import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor  } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      <GoogleOAuthProvider clientId="345257050790-c1n9m6sl7skqar68m4d3c1c1dirlsh8u.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </PersistGate>
      </Provider> 
    </React.StrictMode>

)
