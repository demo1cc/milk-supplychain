import React from "react";
import { myFetch } from "@/utils/myFetch";
import { showAlert } from "@/utils/showAlert";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

// import Web3 from 'web3';
// import userABI from "@/contracts/User";

export default function AddFarmerModal({modalName}){
    const [name, setName] = React.useState(null);
    const [mobile, setMobile] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [address, setAddress] = React.useState({});
    const [password, setPassword] = React.useState("123");
    const [submitting, setSubmitting] = React.useState(false); // New state for loading

    const {authUser} = useAuth();
    const {fetchCenterFarmers} = useData();

    const [storedDb, setStoredDb] = React.useState(false);
    const [storedBC, setStoredBC] = React.useState(false);
    const [bcURL, setBCURL] = React.useState("");
  

    const saveToBlockchain = async (user) => {
      let url = "/api/contract/users";

      let data = await myFetch(url, "POST", 
        {
          "_id": user?._id,
          "name": user?.name,
          "role": user?.role,
          "mobile": user?.mobile,
          "password": user?.password,
          "email": user?.email
        });

      console.log(data);
      setStoredBC(true);
      setBCURL(data.url);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
        let url = "/api/users?type=create-user"
        let farmerData = await myFetch(url, "POST", 
        {
            "name": name, 
            "password": password, 
            "email": email, 
            "mobile": mobile,
            address: address
        });


        saveToBlockchain(farmerData);

        let url2 = "/api/centerFarmers"

        // console.log(farmerData);

        let centerFarmerData = await myFetch(url2, "POST",{
            "centerId": authUser._id,
            "farmerId": farmerData._id,
        })

        // console.log(centerFarmerData);


        setName(""); setEmail("");setMobile("");

        setStoredDb(true);
        //  setAddress({})
        // setSubmitting(false);
        // document.getElementById(modalName).close();
        showAlert("Farmer Added Successfully");
        fetchCenterFarmers();

        }

        catch (e) { 
            showAlert("Something went wrong", "error")
        } 
        finally{
            setSubmitting(false);
        }
        
        // console.log(name, email, password, address);
    }

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
      };

    return (

        <dialog id={modalName} className="modal">
  <div className="modal-box">
  <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <h3 className="font-bold text-lg">Add Farmer</h3>
    
    {!storedDb &&  <form className="mt-8" onSubmit={handleSubmit}>
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
                    <label className="block mb-2 text-sm">Email address</label>
                    <input
                      type="email"
                      name="email"
                    
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>
                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Mobile</label>
                    <input
                      type="text"
                      required
                      name="mobile"
                      value={mobile}
                      onChange={(e)=> setMobile(e.target.value)}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Address1</label>
                    <input
                      type="text"
                      required
                      name="address1"
                      value={address.address1}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">Address2</label>
                    <input
                      type="text"
                      required
                      name="address2"
                      value={address.address2}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">City</label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">State</label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleChange}

                      placeholder=""
                      className="block w-full mt-2 input input-sm input-bordered"
                    />
                  </div>

                  <div className=" mt-4">
                    <label className="block mb-2 text-sm">PIN</label>
                    <input
                      type="text"
                      name="pin"
                      value={address.pin}
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
    </form>  }

    {storedDb && <div className="">
      <span className="py-4 text-success">Data stored in the database</span>
      </div>
      }

    {(storedDb && !storedBC) &&
    <div className=""> 
    <span className="py-4 text-info">Storing to blockchain....</span>
    </div>
    }

    {storedBC && <span className="py-4">
      
      Data stored at blockchain network. URL is <a className="text-primary" target="_blank" href={bcURL}>{bcURL}</a>
      
      </span>}
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

    )
}