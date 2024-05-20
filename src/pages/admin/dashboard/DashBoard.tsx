import { useEffect } from "react";
import { Selected } from "../../../types/props";
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux';

function Dashboard({setSelectedLink, link}:Selected) {

    useEffect(() => {
        setSelectedLink(link);
      }, []);

      const { adminInfo } = useSelector((state: RootState) => state.auth);
      console.log("adni",adminInfo)

      const adminId = adminInfo?._id
  
      console.log("adId",adminId)

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard