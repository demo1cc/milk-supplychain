import React from "react";
import { useAuth } from "@/context/AuthContext";
import { myFetch } from "@/utils/myFetch";
import { showAlert } from "@/utils/showAlert";
import { useData } from "@/context/DataContext";

export default function AddContainerModal({modalName}){

  const [formData, setFormData] = React.useState({});


  const [submitting, setSubmitting] = React.useState(false); // New state for loading

    const {authUser} = useAuth();
    const {fetchFarmerContainers} = useData();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setSubmitting(true);

    try {
    let url = "/api/farmerContainers"
    formData['farmerId'] = authUser._id;

    let data = await myFetch(url, "POST", formData);

    console.log(data);
    setFormData({})

    // setSubmitting(false);
    document.getElementById(modalName).close();
    showAlert("Container Added Successfully");
    fetchFarmerContainers();
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
                  

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">maxCapacity</label>
                    <input
                      type="text"
                      required
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleChange}

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