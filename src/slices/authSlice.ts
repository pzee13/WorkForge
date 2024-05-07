import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  _id?: string;
  name: string;
  email: string;
  mobile?: string;
  password?: string;
}

interface InitialState {
    userInfo: UserInfo | null;
    registerInfo: UserInfo | null;
    adminInfo: UserInfo | null;
  }


  const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo");



const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage
      ? JSON.parse(userInfoFromLocalStorage)
      : null,
  
    registerInfo: registerInfoFromLocalStorage
      ? JSON.parse(registerInfoFromLocalStorage)
      : null,

      adminInfo: adminInfoFromLocalStorage
      ? JSON.parse(adminInfoFromLocalStorage)
      : null,
}  



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setCredential: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      },
  
      setRegister: (state, action) => {
        state.registerInfo = action.payload;
        localStorage.setItem("registerInfo", JSON.stringify(action.payload));
      },
  
      clearRegister: (state) => {
        state.registerInfo = null;
        localStorage.removeItem("registerInfo");
      },
  
      userLogout:(state) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo")
      },

      setAdminCredentials: (state, action) => {
        state.adminInfo = action.payload;
        localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      },

      adminLogout: (state) => {
        state.adminInfo = null;
        localStorage.removeItem("adminInfo")
      }
  
      }
})  



export const {
    setCredential,
    setRegister,
    clearRegister,
    userLogout,
    setAdminCredentials,
    adminLogout,
} = authSlice.actions;

export default authSlice.reducer;