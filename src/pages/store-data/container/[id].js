import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext';
import LoginRequired from '@/components/LoginRequired';
import React from 'react';
import { showAlert } from '@/utils/showAlert';
import { myFetch } from '@/utils/myFetch';

import { GiCow } from "react-icons/gi";
import Loading from '@/components/Loading';


export default function StoreCowData () {
    const router = useRouter();

    const [submittedDB, setSubmittedDB] = React.useState(false);
    const [submittedBlockChain, setSubmittedBlockChain] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [quality, setQuality] = React.useState({});
    const [quantity, setQuantity] = React.useState(null);
    const {authUser} = useAuth();
    const [cowMilkQualityIds, setCowMilkQualityIds] = React.useState(null);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [containerMilkQuality, setContainterMilkQuality] = React.useState(null);



    const {id} = router.query;

    React.useEffect(()=>{
        if (authUser?.role==="center" && id) { 
            // setDataLoaded(true);
            // console.log("fsdfasdfad")
            fetchContainerMilkQuality();

        }
    },[authUser, id]);

    const fetchContainerMilkQuality = async () => {
        let url = "/api/containerMilkQualities?checkedAtCenter=false&containerId="+ id;
        let data = await myFetch(url); 
        console.log("container data", data);
        setDataLoaded(true);

        if (data.containerMilkQualitys.length>0){
            setContainterMilkQuality(data.containerMilkQualitys[0]);
        }

    }

    const fetchContainer = async () => {
        let url = "/api/farmerContainers?id=" + id;
        let data = await myFetch(url);
        // console.log(data);
        if (authUser?.role === 'farmer') { 
            getUnstoredCowMilks();
        }
    }

    const getUnstoredCowMilks = async () => { 
    
        let url = "/api/cowMilkQualities?storedInContainer=false&farmerId="+authUser._id;
        // console.log(url);
        let data = await myFetch(url);
        // console.log(data);
        setCowMilkQualityIds(data.cowMilkQualitys);
        setDataLoaded(true);

    }


    React.useEffect(()=>{



        if (id) { 
            fetchContainer();

        }

        
    },[id])

    // console.log(id);

    const {token} = useAuth();

    const handleChange = (e) => {
        setQuality({ ...quality, [e.target.name]: e.target.value });
      };

    const changeStatusCowMilkQualities = async () => {
        let url = "/api/cowMilkQualities";
        for (let i = 0; i < cowMilkQualityIds.length; i++) {
            let id = cowMilkQualityIds[i]._id;
            let data = await myFetch(url, "PUT", 
                {
                    "storedInContainer":true,
                    "id":id,
                }
            )
            console.log(data);
        }
        
    }

    const submitAtFarmer = async () => {

    let url = "/api/containerMilkQualities"
    let data = await myFetch(url, "POST", 
    {
        "quality": quality,
        "quantity": quantity, 
        "cowMilkQualityIds":cowMilkQualityIds,
        "containerId": id,
    });

    // console.log(data);

    setQuality({}); setQuantity(null);

    changeStatusCowMilkQualities();
    setSubmittedDB(true);

    // setSubmitting(false);
    showAlert("Container data stored successfully")
    
    }
    
    const submitAtCenter = async () => {
        let url = "/api/containerMilkQualityCenters";
        let data = await myFetch(url, "POST", 
        {
                "quality": quality,
                "quantity": quantity, 
                "containerMilkQualityId":containerMilkQuality._id,
                "containerId": id,
                "centerId": authUser._id,
        });

        // console.log(data);

        

        setQuality({}); setQuantity(null);
        setSubmittedDB(true);

        showAlert("Cow Milk Dada Stored Successfully");

        // changing to farmerData
        let url2 = "/api/containerMilkQualities"
        let data2 = await myFetch(url2, "PUT", 
        {
            "id":containerMilkQuality._id,
            "checkedAtCenter": true,
        });
        console.log(data2);

    }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setSubmitting(true);

    try {
        if (authUser.role==="farmer"){
            submitAtFarmer();
        } else if (authUser.role=="center"){
            submitAtCenter();
        }
    }
    catch (e) { 
        console.log(e);
        showAlert("Something went wrong", "error")
    } 
    finally{
        setSubmitting(false);
    }
    
    // console.log(name, email, password, address);
}


    if (!dataLoaded) {
        return (
            <div className='p-4'>
            <Loading />
            </div>
        )
    }

    if (!token) { 
        return (
            <LoginRequired  />
        )
    }

    return (
        <div className='bg-base-100 min-h-screen px-4 md:px-8 py-4'>
            
            <div className='card md:w-2/4 m-auto bg-base-200 p-4'>





                {authUser?.role==="center" && 
                <div className='mb-4'> 
                {containerMilkQuality && <div>
                    <h2 className='text-xl'>Farmer's data found for this container</h2>
                    <p>Quantity: {containerMilkQuality?.quantity} lt</p>
                    <p>Quality Parameters: {JSON.stringify(containerMilkQuality?.quality)}</p>
                </div>}
                
                {!containerMilkQuality && <div>
                    <h2 className='text-xl text-error'>Center has already stored the data for this container or farmer has not entered data for this container</h2>

                </div>}
                </div>}

                {( authUser?.role==="farmer" && cowMilkQualityIds?.length===0 ) && <div>

                    <h1 className='text-xl text-error'>
                        The data is already stored for this container. You can not store the data again for this container.
                    </h1>
                </div>}

               {((authUser?.role==="farmer" && cowMilkQualityIds?.length>0) || containerMilkQuality ) && <div>
                <h1 className='text-xl'>Enter the data for the container </h1>
                        

                {!submittedDB && <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="">
                    <label className="block mb-2 text-sm "> Quantity</label>
                    <input
                      type="number"
                      required
                      name="quantity"
                      value={quantity}
                      onChange={(e)=> setQuantity(e.target.value)}
                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Temperature</label>
                    <input
                      type="number"
                      required
                      name="temperature"
                      value={quality.temperature}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Fat</label>
                    <input
                      type="number"
                      required
                      name="fat"
                      value={quality.fat}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Protein</label>
                    <input
                      type="number"
                      required
                      name="protein"
                      value={quality.protein}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className="mt-4">
                

                    {!submitting && <input type="submit" className="btn btn-primary mt-4" />}

                    {submitting && (
                      <button className="btn px-6 py-3 mt-4">
                        <span className="loading loading-spinner"></span>
                        Submitting
                      </button>
                    )}
                  </div>
                </form>

                }


                {submittedDB && <div role="alert" className="alert mt-4 alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>The Data is Stored in the Database</span>
                </div>}

                {submittedBlockChain && <div role="alert" className="alert mt-4 alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>The Data is Stored in the Database</span>
                </div>}

                </div>}
            </div>
            
        </div>
    )
}