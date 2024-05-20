import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from 'react'
import { RootState } from "../../app/store";

export function UserAuthRoute(){
    const { userInfo } = useSelector((state:RootState) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Open login modal if userInfo doesn't exist
    useEffect(() => {
        if (userInfo) {
            navigate('/user/home');
        }
    }, [dispatch, navigate, userInfo]);

    return userInfo ?<Outlet/> :  <Navigate to="/user/login" replace />
}

