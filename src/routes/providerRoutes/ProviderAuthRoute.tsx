import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


export function ProviderAuthRoute(){
    const { providerInfo } = useSelector((state:RootState) => state.auth);

  

  


    return providerInfo ?<Outlet/> :  <Navigate to="/provider/login" replace />
}
