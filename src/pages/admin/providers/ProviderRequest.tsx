import { useEffect } from "react";
import { Selected } from "../../../types/props";


function ProviderRequest({setSelectedLink, link}:Selected) {

    useEffect(() => {
        setSelectedLink(link);
      }, []);

  return (
    <div>Provider Requests</div>
  )
}

export default ProviderRequest