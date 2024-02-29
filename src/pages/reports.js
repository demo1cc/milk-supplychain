import { useAuth } from "@/context/AuthContext";
import React from "react";
import { myFetch } from "@/utils/myFetch";

import LoginRequired from "@/components/LoginRequired";
import Loading from "@/components/Loading";

export default function Reports() {


    // const today = "2024-2-26"
    const [date, setDate] = React.useState();

    const {token, authUser} = useAuth();

    const [centerContainerQualities, setCenterContainerQualities] = React.useState([]);
    const [loading1, setLoading1] = React.useState(true);
    const [productQualities, setProductQualities] = React.useState([]);
    const [loading2, setLoading2] = React.useState(true);

    const [domain, setDomain] = React.useState("");


    React.useEffect(()=>{
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    },[])


    const handleDateChange = event => {
        console.log(event.target.value);
        setDate(event.target.value);
      };

    React.useEffect(() => {

      const protocol = typeof window !== 'undefined' ? window.location.protocol : '';
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    
      // Combine protocol and hostname to get the complete domain
      const domain = protocol + '//' + hostname;
      setDomain(domain);
      // console.log(domain);
    },[])



    const getCenterContainerQualities = async () => {
        setLoading1(true);
        let url = `/api/centerContainerQualities?centerId=${authUser._id}&created=${date}`;
        let data = await myFetch(url)
        console.log(data);
        setCenterContainerQualities(data.centerContainerQualitys);
        setLoading1(false);
    }

    const getProductQualities = async () => { 
        setLoading2(true);
        let url = `/api/productQualities?centerId=${authUser._id}&created=${date}`;
        let data = await myFetch(url);
        console.log(data);
        setProductQualities(data.productQualitys);
        setLoading2(false)
    }

    React.useEffect(()=>{
        if (authUser?.role==="center" && date){
            getCenterContainerQualities();
            getProductQualities();
        }
    },[authUser, date])




    if (!token) { 
        return (
            <LoginRequired />
        )
    }

    if (authUser.role!="center") {
        return (
            <div className="bg-base-100 min-h-screen px-4 md:px-8 py-4">
                <p className="text-xl text-error">
                    You are not allowed to access this page
                </p>
            </div>
        )
    }

    return (
        <div className="bg-base-100 min-h-screen px-4 md:px-8 py-4">
            <div className='card md:w-3/4 m-auto bg-base-200 p-4'>

                <div className="py-3">
                    <label className="text-sm ">Select Date: </label>
                    <input
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      placeholder=""
                      className="mt-2 input input-sm input-bordered"
                    />
                </div>


                <h1 className="text-xl">Containers Report</h1>

                {loading1 && <Loading />}

                {(!loading1 &&  centerContainerQualities.length ===0 ) && 
                <div className="p-4">No Data Available</div>
                }

                {centerContainerQualities.map((containerQuality, index)=>
                    <div key={index} className="border-l-primary p-4">
                        <p>Quantity: {containerQuality.quantity} lts</p>
                        <p>Quality:  { JSON.stringify(containerQuality.quality)}</p>
                        <p>Total Containers: {containerQuality.containerIds.length}</p>

                    </div>
                )}

                
                <h1 className="text-xl">Products Report</h1>

                {loading2 && <Loading />}


                {(!loading2 && productQualities.length ===0) && 
                    <div className="p-4">No Data Available</div>
                }


                {productQualities.map((productQuality, index)=>
                    <div key={index} className="border-l-primary p-4">
                        <p>Product Name: {productQuality.productName} </p>
                        <p>Quantity:  { productQuality.quantity } lts</p>
                        <p>Quality:  { JSON.stringify(productQuality.quality)}</p>
                        <a target="_blank" href={"https://api.qrserver.com/v1/create-qr-code/?size=240x240&data="+ domain+"/api/productQualities?id="+productQuality._id}>
                            <button className="mt-2 btn btn-sm btn-outline ">Generate Data QR</button>
                        </a>
                    </div>
                )}


            </div>
        </div>
    )
}