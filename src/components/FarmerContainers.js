import React from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";
import Link from "next/link";

export default function FarmerContainers(){

    const {farmerContainerData} = useData();

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();

    const [farmerContainers, setFarmerContainers] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const {authUser} = useAuth();

    const [domain, setDomain] = React.useState("");

    React.useEffect(() => {

      const protocol = typeof window !== 'undefined' ? window.location.protocol : '';
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    
      // Combine protocol and hostname to get the complete domain
      const domain = protocol + '//' + hostname;
      setDomain(domain);
      console.log(domain);
    },[])


    React.useEffect(()=> {
        if (farmerContainerData) {
          // console.log("this is if", ownerPenaltyData.ownerPenalties);
          setFarmerContainers(farmerContainerData.farmerContainers);
          setTotalPages(farmerContainerData.totalPages);
          setLoading(false);
        }
      
    }, [farmerContainerData])



    const getFarmerContainers = async (page) => {
        setLoading(true);
        let url = `/api/farmerContainers?page=${page}&farmerId=`+authUser?._id;
        let data = await myFetch(url); 
        // setOwnerPenanlties(data.OwnerPenalties);
        setFarmerContainers((farmerContainers) => [...farmerContainers, ...data.farmerContainers]);
    
        setPage(data.page);
        setLoading(false);
        // setTotalPages(data.totalPages);
        // localStorage.setItem('ownerPenalties', data);
        // console.log(data);
      }

    const loadMoreContainers = async () => {
    
        getFarmerContainers(page+1);
      }
    


    return (
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Container No.</th>
        <th>Max Capacity</th>
        <th>QR code</th>
      </tr>
    </thead>
    <tbody>
      {farmerContainers.map((farmerContainer, index)=><tr key={index}>
      <td>{farmerContainer.containerNumber}</td>
        <td>{farmerContainer.maxCapacity}</td>
        <td><a target="_blank" href={"https://api.qrserver.com/v1/create-qr-code/?size=240x240&data="+ domain+"/store-data/container/"+farmerContainer._id}>Generate QR</a> </td>

      </tr>)}
    </tbody>
  </table>

  {loading && <Loading />}
    {(page<totalPages && !loading) && 
    <button onClick={loadMoreContainers} className="btn btn-sm mt-2">Load More</button>
    }

</div>


    )
}
