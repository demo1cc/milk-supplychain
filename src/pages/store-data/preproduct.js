import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { myFetch } from '@/utils/myFetch';
import LoginRequired from '@/components/LoginRequired';
import { showAlert } from '@/utils/showAlert';
export default function PreProduct() {

    const {token, authUser} = useAuth();
    const [centerContainerQuality, setContainterMilkQuality] = React.useState(null);

    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const [submittedDB, setSubmittedDB] = React.useState(false);
    const [submittedBlockChain, setSubmittedBlockChain] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [quality, setQuality] = React.useState({});
    const [quantity, setQuantity] = React.useState("");
    const [checkAllDone, setCheckAllDone] = React.useState(false);


    React.useEffect(()=> {
        if (centerContainerQuality ){
        setCheckAllDone(centerContainerQuality.isMilkStored && centerContainerQuality.isPaneerStored && centerContainerQuality.isCurdStored && centerContainerQuality.isIceCreamStored && centerContainerQuality.isGheeStored)
        }
    },[ centerContainerQuality ])

    const getCenterContainerQuality = async () => {

        let url = "/api/centerContainerQualities?centerId="+ authUser._id;
        let data = await myFetch(url);
        setContainterMilkQuality(data.centerContainerQualitys[0]);

        console.log(data.centerContainerQualitys[0])
    }

    const handleChange = (e) => {
        setQuality({ ...quality, [e.target.name]: e.target.value });
      };

      const changeStatusToStored = async () => {
        let url = "/api/centerContainerQualities"
        let formData =  {"id": centerContainerQuality._id}

        if (selectedProduct==="milk") {
            formData['isMilkStored'] = true
        }
        if (selectedProduct==="curd") {
            formData['isCurdStored'] = true
        }
        if (selectedProduct==="ghee") {
            formData['isGheeStored'] = true
        }

        if (selectedProduct==="iceCream"){
            formData['isIceCreamStored'] = true
        }
        if (selectedProduct==="paneer") {
            formData["isPaneerStored"] = true
        }

        let data = await myFetch(url, "PUT", formData);
        console.log(data);
        setContainterMilkQuality(data);
        setSelectedProduct("");
        
    }
    
  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log( "selected", selectedProduct);

    if (!selectedProduct) {


        showAlert("Please select a product", "error")
        return 

    }

    setSubmitting(true);

    try {
    let url = "/api/preProductQualities"
    let data = await myFetch(url, "POST", 
    {   
        "centerId": authUser._id, 
        "productName": selectedProduct,
        "quality": quality,
        "quantity": quantity, 
        "centerContainerQualityId": centerContainerQuality._id,
    });

    console.log(data);

    setQuality({
      temperature: "",
      fat:"",
      protein:""
    }); setQuantity("");
    setSubmittedDB(true);
    changeStatusToStored();
    // setSubmitting(false);
    showAlert("Data Stored Successfully")
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



    React.useEffect(()=> {

        if (authUser){
            getCenterContainerQuality();
        }

    },[authUser]);





    if (!token) {

        return <LoginRequired />
     }


    return(
        <div className='bg-base-100 min-h-screen px-4 md:px-8 py-4'>
            
            <div className='card md:w-2/4 m-auto bg-base-200 p-4'>


            {checkAllDone && <div>
                <h1 className='text-xl text-info'> All the data stored for all the products</h1>
            </div>    
            }

            {/* {submittedDB && <div role="alert" className="alert mt-4 alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>The Data is stored in the database</span>
            </div>} */}
            

            {(!checkAllDone) && <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="">

                    <h1 className='text-xl mb-4'>Enter the data for pre products</h1>


            <select value={selectedProduct} onChange={(e)=> setSelectedProduct(e.target.value)} className="select mb-4  select-sm select-bordered">
                <option selected disabled value={""}>Selecte Product Name: </option>

                {!centerContainerQuality?.isMilkStored && <option value={"milk"}>Milk</option>}
               {!centerContainerQuality?.isPaneerStored && <option value={"paneer"}>Paneer</option> }
               {!centerContainerQuality?.isCurdStored && <option value={"curd"}>Curd</option> }
                {!centerContainerQuality?.isIceCreamStored && <option value={"iceCream"}>Ice Cream</option> }
                {!centerContainerQuality?.isGheeStored && <option value={"ghee"}>Ghee</option> }
            </select>
            
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




                {submittedBlockChain && <div role="alert" className="alert mt-4 alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>The Data is Stored in the Database</span>
                </div>}


            </div>

        </div>
    )
}