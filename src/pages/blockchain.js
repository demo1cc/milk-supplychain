import React from "react";
import { myFetch } from "@/utils/myFetch";

export default function Blockchain(){

    const [farmers, setFarmers] = React.useState([]);
    const [cows, setCows] = React.useState([]);
    const [cowMilkData, setCowMilkData] = React.useState([]);
    const [productData, setProductData] = React.useState([]);

    const [showFarmers, setShowFarmers] = React.useState(false);
    const [showCows, setShowCows] = React.useState(false);
    const [showMilkData, setShowMilkData] = React.useState(false);
    const [showProductData, setShowProductData] = React.useState(false);


    const fetchFarmers = async () => {
        let url = "/api/contract/users";
        let data = await myFetch(url);
        // console.log(data);
        setFarmers(data);

    }
    const fetchCows = async () => { 
        let url = "/api/contract/cows";
        let data = await myFetch(url);
        // console.log(data);
        setCows(data);
    }

    const fetchCowMilkData = async () => { 
        let url = "/api/contract/cowMilkQualities";
        let data = await myFetch(url);
        // console.log(data);
        setCowMilkData(data);
    }

    const fetchProductData = async () => {
        let url = "/api/contract/productQualities";
        let data = await myFetch(url);
        // console.log(data);
        setProductData(data);

    }

    React.useEffect(()=>{
        fetchFarmers();
        fetchCows();
        fetchCowMilkData();
        fetchProductData();
    },[])



    return (
        <div className="bg-base-100 min-h-screen px-4 md:px-8 py-4">
            <h1 className="text-3xl">Details</h1>
            <p className="pt-2">Public key - {process.env.PUBLIC_KEY}</p>
            <p className="pt-2">Network - Sepolia Test Network</p>
            <p className="pt-2">View All Transactions - <a target="_blank" href="https://sepolia.etherscan.io/address/0x8265CfD974CC18714e3466C747e72E9BeFa3FF9A" className="text-primary">Click Here</a> </p>

            <br />
            <p className="opacity-80">*We are getting the data from blockchain Network here.</p>

            <div className="py-4">
            <button onClick={()=>setShowFarmers(!showFarmers)} className="btn btn-sm my-2">{(showFarmers? "Hide":"Show") + " Farmers data"}</button>

            {showFarmers && <div className="my-2">

                {farmers.map(farmer => 
                
                    <p>{JSON.stringify(farmer)}</p>
                )}
            </div>}

            <br />

            <button onClick={()=>setShowCows(!showCows)} className="py-2 btn btn-sm my-2">{(showCows? "Hide":"Show") + " Cows data"}</button>

            {showCows && <div className="my-2">

                {cows.map(cow => 
                
                    <p>{JSON.stringify(cow)}</p>
                )}
            </div>}

            <br />

            <button onClick={()=>setShowMilkData(!showMilkData)} className="py-2 btn btn-sm my-2">{(showMilkData? "Hide":"Show") + " Cows Milk data"}</button>

            {showMilkData && <div className="my-2">

            {cowMilkData.map(data => 

                <p>{JSON.stringify(data)}</p>
            )}
            </div>}


            <br />
        

            <button onClick={()=>setShowProductData(!showProductData)} className="py-2 btn btn-sm my-2">{(showProductData? "Hide":"Show") + " Products data"}</button>


            {showProductData && <div className="my-2">

                {productData.map(data => 

                    <p>{JSON.stringify(data)}</p>
                )}
                </div>}

            <br />

            </div>

        </div>
    )
}