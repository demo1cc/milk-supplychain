import { myFetch } from "@/utils/myFetch"
import { useAuth } from "@/context/AuthContext"
import LoginRequired from "@/components/LoginRequired"
import React from "react";
import { showAlert } from "@/utils/showAlert";
import { set } from "mongoose";

export default function StoreDataCenter() {

    const {token, authUser} = useAuth();
    const [containerIds, setContainerIds] = React.useState([]);

    const [submittedDB, setSubmittedDB] = React.useState(false);
    const [submittedBlockChain, setSubmittedBlockChain] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [quality, setQuality] = React.useState({});
    const [quantity, setQuantity] = React.useState(null);
    const [totalQuantityGot, setTotalQuantityGot] = React.useState();

    const [containerMilkQualityCenters, setContainerMilkQualityCenters] = React.useState([]);


    const handleChange = (e) => {
        setQuality({ ...quality, [e.target.name]: e.target.value });
      };

    const changeStatusToStored = async () => {
        let url; 
        for (let containerMilkQualityCenter of containerMilkQualityCenters) { 
            url = "/api/containerMilkQualityCenters"
            await myFetch(url, "PUT", {
                id: containerMilkQualityCenter._id,
                storedAtCenter: true,
            })
        }
    }
    
  const handleSubmit = async (e) => {

    e.preventDefault();
    setSubmitting(true);

    try {
    let url = "/api/centerContainerQualities"
    let data = await myFetch(url, "POST", 
    {
        "quality": quality,
        "quantity": quantity, 
        "containerIds":containerIds,
        "centerId": authUser._id,
    });

    console.log(data);

    setQuality({}); setQuantity(null);
    setSubmittedDB(true);
    changeStatusToStored();

    // setSubmitting(false);
    showAlert("Cow Milk Dada Stored Successfully")
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


    

    const getContainerIds = async () => {
        let url = "/api/containerMilkQualityCenters?storedAtCenter=false&pageSize=1000";
        let data = await myFetch(url);
        let array = data.containerMilkQualityCenters;
        setContainerMilkQualityCenters(array);

        let total = 0 
        for (let i of array) {
          // console.log(i);
          total = total + i?.quantity;
        }
        console.log(total);
        setTotalQuantityGot(total);
        // console.log(array);

        const containerIds = array.map(item => item.containerId);
        // console.log(containerIds);
        setContainerIds(containerIds);
    }

    React.useEffect(()=> {

        if (authUser?.role==="center") {
            getContainerIds();
        }

    }, [authUser])



    if (!token) { 
        return (
            <LoginRequired  />
        )
    }
    
    return (

        <div className='bg-base-100 min-h-screen px-4 md:px-8 py-4'>
            
            <div className='card md:w-2/4 m-auto bg-base-200 p-4'>

                {containerIds.length === 0 && <div>
                    <h1 className="text-xl text-info">
                        No container found here. Either you have stored the data for all containers or something went wrong
                    </h1>
                </div>
                }
                
                {containerIds.length>0 && <div>

                <h1 className='text-xl'>Enter the Data</h1>
                <h1 className='text opacity-60'>{containerIds.length} containers found | Total Quantity - {totalQuantityGot}</h1>



                {!submittedDB && <form className="mt-8" onSubmit={handleSubmit}>
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
                    <label className="block mb-2 text-sm">temperature</label>
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