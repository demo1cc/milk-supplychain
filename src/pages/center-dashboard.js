import { useAuth } from "@/context/AuthContext";
import React from "react";
import { IoMdAdd } from "react-icons/io";

import AddFarmerModal from "@/components/AddFarmerModal";
import AddVanModal from "@/components/AddVanModal";
import CenterFarmers from "@/components/CenterFarmers";

import CenterVans from "@/components/CenterVans";
import LoginRequired from "@/components/LoginRequired";
import Link from "next/link";

export default function CenterDashBoard() {

    const {token} = useAuth();

    if (!token) { 
        return (
            <LoginRequired />
        )
    }

    return (
        <div className="bg-base-100 min-h-screen px-4 md:px-8 py-4">


            <Link href={"/store-data/center"}> <button className="btn btn-sm mb-4 mr-2">Store data at center</button> </Link>
            <Link href={"/store-data/preproduct"}> <button className="btn btn-sm mb-4 mr-2">Store data for pre product</button> </Link>
            <Link href={"/store-data/product"}> <button className="btn btn-sm mb-4 mr-2">Store data for product</button> </Link>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-base-200 card p-4">


                <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="btn btn-outline btn-sm mb-4">
                    <IoMdAdd />
                    Farmer
                </button>

                <AddFarmerModal modalName={'my_modal_1'} />



                <CenterFarmers />


                </div>
                <div className="bg-base-200 card p-4">

                <button onClick={()=>document.getElementById('my_modal_2').showModal()}  className="btn btn-outline btn-sm mb-4">
                    <IoMdAdd />
                    Van
                </button>

                <AddVanModal modalName={'my_modal_2'} />


                <CenterVans />

                </div>
            </div>

            
        </div>
    )
}