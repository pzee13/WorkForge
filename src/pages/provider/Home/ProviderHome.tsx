import Navbar from "../../../component/provider/navbar/Navbar";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';



export function ProviderHome(){
    const { providerInfo } = useSelector((state: RootState) => state.auth);

    console.log("providerInfo",providerInfo)
    const providerId = providerInfo?._id

    console.log("prId",providerId)
    return(
    <>
    <Navbar />
    </>)
}