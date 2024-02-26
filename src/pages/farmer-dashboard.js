import { useAuth } from "@/context/AuthContext";
import LoginRequired from "@/components/LoginRequired";
import AddCowModal from "@/components/AddCowModal";
import AddContainerModal from "@/components/AddContainerModal";
import { IoMdAdd } from "react-icons/io";
import FarmerCows from "@/components/FarmerCows";
import FarmerContainers from "@/components/FarmerContainers";

export default function FarmerDashBoard() {

    const {token} = useAuth();

    if (!token) { 
        return (
            <LoginRequired  />
        )
    }

    return (
        <div className="px-4 md:px-8 min-h-screen bg-base-100">
            <div className="grid  grid-cols-1 pb-4 md:grid-cols-2 md:gap-4">
            
                <div className="card bg-base-200 p-4 mt-4">
                <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="btn btn-outline btn-sm mb-4">
                    <IoMdAdd />
                    Cow
                </button>
                <AddCowModal modalName={'my_modal_1'} />

                <FarmerCows />



                </div>

                <div className="card bg-base-200 p-4 mt-4">
                <button onClick={()=>document.getElementById('my_modal_2').showModal()} className="btn btn-outline btn-sm mb-4">
                    <IoMdAdd />
                    Container
                </button>
                <AddContainerModal modalName={'my_modal_2'} />

                <FarmerContainers />




                </div>
            </div>

        </div>
    )
}