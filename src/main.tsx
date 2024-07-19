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

      <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
      </PersistGate>
      </Provider> 
    </React.StrictMode>

)
