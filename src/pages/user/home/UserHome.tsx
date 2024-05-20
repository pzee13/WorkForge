import Navbar from "../../../component/user/navbar/Navbar";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';

export function UserHome(){
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const userId = userInfo?._id

    console.log("prId",userId)
    return (<>
    <Navbar />
    </>)
}