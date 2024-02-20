import React from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";

export default function CenterFarmers(){

    const {centerFarmerData} = useData();

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();

    const [centerFarmers, setCenterFarmers] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const {authUser} = useAuth();

    React.useEffect(()=> {
        if (centerFarmerData) {
          // console.log("this is if", ownerPenaltyData.ownerPenalties);
          setCenterFarmers(centerFarmerData.centerFarmers);
          setTotalPages(centerFarmerData.totalPages);
          setLoading(false);
        }
      
    }, [centerFarmerData])



    const getCenterFarmers = async (page) => {
        setLoading(true);
        let url = `/api/centerFarmers?page=${page}&centerId=`+authUser?._id;
        let data = await myFetch(url); 
        // setOwnerPenanlties(data.OwnerPenalties);
        setCenterFarmers((centerFarmers) => [...centerFarmers, ...data.centerFarmers]);
    
        setPage(data.page);
        setLoading(false);
        // setTotalPages(data.totalPages);
        // localStorage.setItem('ownerPenalties', data);
        // console.log(data);
      }

    const loadMoreFarmers = async () => {
    
        getCenterFarmers(page+1);
      }
    


    return (
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
      </tr>
    </thead>
    <tbody>
      {centerFarmers.map((centerFarmer, index)=><tr key={index}>
      <td>{centerFarmer.farmerId.name}</td>
        <td>{centerFarmer.farmerId.email}</td>
        <td>{centerFarmer.farmerId.mobile}</td>
      </tr>)}
    </tbody>
  </table>

  {loading && <Loading />}
    {(page<totalPages && !loading) && 
    <button onClick={loadMoreFarmers} className="btn btn-sm mt-2">Load More</button>
    }

</div>


    )
}