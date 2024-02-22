import React from "react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import { myFetch } from "@/utils/myFetch";
import Link from "next/link";



export default function FarmerCows(){

    const {farmerCowData} = useData();

    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState();

    const [farmerCows, setFarmerCows] = React.useState([]);

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
        if (farmerCowData) {
          // console.log("this is if", ownerPenaltyData.ownerPenalties);
          setFarmerCows(farmerCowData.farmerCows);
          setTotalPages(farmerCowData.totalPages);
          setLoading(false);
        }
      
    }, [farmerCowData])





    const getFarmerCows = async (page) => {
        setLoading(true);
        let url = `/api/farmerCows?page=${page}&farmerId=`+authUser?._id;
        let data = await myFetch(url); 
        // setOwnerPenanlties(data.OwnerPenalties);
        setFarmerCows((farmerCows) => [...farmerCows, ...data.farmerCows]);
    
        setPage(data.page);
        setLoading(false);
        // setTotalPages(data.totalPages);
        // localStorage.setItem('ownerPenalties', data);
        // console.log(data);
      }

    const loadMoreCows = async () => {
    
        getFarmerCows(page+1);
      }
    


    return (
<div className="overflow-x-auto">

  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Breed</th>
        <th>Milking System</th>
        <th>QR code</th>
      </tr>
    </thead>
    <tbody>
      {farmerCows.map((farmerCow, index)=><tr key={index}>
      <td>{farmerCow._id}</td>

      <td>{farmerCow.breed}</td>
        <td>{farmerCow.milkingSystem}</td>
        <td><Link href={"/generate-qr?url="+ domain+"/store-data/cow/"+farmerCow._id}>Generate QR</Link> </td>
      </tr>)}

    </tbody>
  </table>

  {loading && <Loading />}
    {(page<totalPages && !loading) && 
    <button onClick={loadMoreCows} className="btn btn-sm mt-2">Load More</button>
    }

</div>


    )
}
