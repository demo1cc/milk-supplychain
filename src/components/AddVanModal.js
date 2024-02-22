import React from "react";
import { useAuth } from "@/context/AuthContext";
import { myFetch } from "@/utils/myFetch";
import { showAlert } from "@/utils/showAlert";
import { useData } from "@/context/DataContext";

export default function AddVanModal({modalName}){

  const [name, setName] = React.useState(null);
  const [vehicleNumber, setVehicleNumber] = React.useState(null);

  const [submitting, setSubmitting] = React.useState(false); // New state for loading

    const {authUser} = useAuth();
    const { fetchCenterVans } = useData();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setSubmitting(true);

    try {
    let url = "/api/centerVans"
    let vanData = await myFetch(url, "POST", 
    {
        "name": name,
        "vehicleNumber": vehicleNumber,
        "centerId": authUser._id,
    });

    console.log(vanData);

    setName(""); setVehicleNumber("")
    // setSubmitting(false);
    document.getElementById(modalName).close();
    showAlert("Van Added Successfully");
    fetchCenterVans();
    }
    catch (e) { 
        showAlert("Something went wrong", "error")
    } 
    finally{
        setSubmitting(false);
    }
    
    // console.log(name, email, password, address);
}




    return (

        <dialog id={modalName} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <h3 className="font-bold text-lg">Add Van</h3>

    <form className="mt-8" onSubmit={handleSubmit}>
                  <div className="">
                    <label className="block mb-2 text-sm "> Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={name}
                      onChange={(e)=> setName(e.target.value)}
                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm">Vehicle Number</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      required
                    
                      value={vehicleNumber}
                      onChange={(e)=> setVehicleNumber(e.target.value)}
                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>
                 

                  <div className="mt-4">
                

                    {!submitting && <input type="submit" className="btn mt-4" />}

                    {submitting && (
                      <button className="btn px-6 py-3 mt-4">
                        <span className="loading loading-spinner"></span>
                        Submitting
                      </button>
                    )}
                  </div>
                </form>



  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

    )
}