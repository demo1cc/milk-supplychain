import React from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";
export default function FarmerContainers(){

    const {farmerContainerData} = useData();

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();

    const [farmerContainers, setFarmerContainers] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const {authUser} = useAuth();

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
        <th>ID</th>
        <th>Max Capacity</th>
      </tr>
    </thead>
    <tbody>
      {farmerContainers.map((farmerContainer, index)=><tr key={index}>
      <td>{farmerContainer._id}</td>
        <td>{farmerContainer.maxCapacity}</td>
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