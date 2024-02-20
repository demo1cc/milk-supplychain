import { useAuth } from "@/context/AuthContext";
import React from "react";
import { IoMdAdd } from "react-icons/io";

import AddFarmerModal from "@/components/AddFarmerModal";
import AddVanModal from "@/components/AddVanModal";
import CenterFarmers from "@/components/CenterFarmers";

import CenterVans from "@/components/CenterVans";
import LoginRequired from "@/components/LoginRequired";

export default function CenterDashBoard() {

    const [selectedTab, setSelectedTab] = React.useState("records")
    const {token} = useAuth();

    if (!token) { 
        return (
            <LoginRequired />
        )
    }


    return (
        <div className="bg-base-100 px-8 py-4">

            <div className="flex justify-between">

                <div>

                    <button className={(selectedTab==="records" ? "btn-primary btn-sm btn mr-2":"btn btn-sm mr-2" )} onClick={()=>setSelectedTab("records")}>Records</button>
                    <button className={(selectedTab==="farmers" ? "btn-primary btn-sm btn mr-2":"btn btn-sm mr-2" )} onClick={()=>setSelectedTab("farmers")}>Farmers</button>
                    <button className={(selectedTab==="vans" ? "btn-primary btn-sm btn mr-2":"btn btn-sm mr-2" )} onClick={()=>setSelectedTab("vans")}>Vans</button>
                </div>

                <div>
                    
                <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="btn btn-sm mr-2">
                    <IoMdAdd />
                    Farmer
                </button>
                <AddFarmerModal modalName={'my_modal_1'} />

                <button onClick={()=>document.getElementById('my_modal_2').showModal()}  className="btn btn-sm mr-2">
                    <IoMdAdd />
                    Van
                </button>

                <AddVanModal modalName={'my_modal_2'} />

                </div>


            </div>
            <div className="py-2">
           {selectedTab === "records" && <div className="card bg-base-200 p-4">
                <h2>Records</h2>

                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>

            </div>}

            {selectedTab === "farmers" && <div className="card bg-base-200 p-4">
                <h2>Farmers</h2>

                <CenterFarmers />
            </div>}

            {selectedTab === "vans" && <div className="card bg-base-200 p-4">
                <h2>Vans</h2>

                <CenterVans />

                
            </div>}

            </div>
            
        </div>
    )
}