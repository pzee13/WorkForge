import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export function UserAuthRoute(){
    const { userInfo } = useSelector((state:RootState) => state.auth);
    return userInfo ?<Outlet/> :  <Navigate to="/user/login" replace />
}

