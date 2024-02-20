import React from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";
export default function CenterVans(){

    const {centerVanData} = useData();

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();

    const [centerVans, setCenterVans] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const {authUser} = useAuth();

    React.useEffect(()=> {
        if (centerVanData) {
          // console.log("this is if", ownerPenaltyData.ownerPenalties);
          setCenterVans(centerVanData.centerVans);
          setTotalPages(centerVanData.totalPages);
          setLoading(false);
        }
      
    }, [centerVanData])



    const getCenterVans = async (page) => {
        setLoading(true);
        let url = `/api/centerVans?page=${page}&centerId=`+authUser?._id;
        let data = await myFetch(url); 
        // setOwnerPenanlties(data.OwnerPenalties);
        setCenterVans((centerVans) => [...centerVans, ...data.centerVans]);
    
        setPage(data.page);
        setLoading(false);
        // setTotalPages(data.totalPages);
        // localStorage.setItem('ownerPenalties', data);
        // console.log(data);
      }

    const loadMoreVans = async () => {
    
        getCenterVans(page+1);
      }
    


    return (
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Vehicle Number</th>
      </tr>
    </thead>
    <tbody>
      {centerVans.map((centerVan, index)=><tr key={index}>
      <td>{centerVan.name}</td>
        <td>{centerVan.vehicleNumber}</td>
      </tr>)}
    </tbody>
  </table>

  {loading && <Loading />}
    {(page<totalPages && !loading) && 
    <button onClick={loadMoreVans} className="btn btn-sm mt-2">Load More</button>
    }

</div>


    )
}