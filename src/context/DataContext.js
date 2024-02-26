
import { myFetch } from '@/utils/myFetch';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const {token, authUser} = useAuth();
    const [centerFarmerData, setCenterFarmerData] = useState(null);
    const [centerVanData, setCenterVanData ] = useState(null);
    const [farmerCowData, setFarmerCowData] = useState(null);
    const [farmerContainerData, setFarmerContainerData] = useState(null);




      const fetchFarmerCows = async (page) => {
        try {
        let url = `/api/farmerCows?farmerId=`+authUser?._id;
        let data = await myFetch(url); 
        // console.log(data);
        setFarmerCowData(data);
        } catch (error) {
            console.error("Error fetching imposePenalties:", error);    
        }    
      }

      const fetchFarmerContainers = async (page) => {
        try {
        let url = `/api/farmerContainers?farmerId=`+authUser?._id;
        let data = await myFetch(url); 
        // console.log(data);
        setFarmerContainerData(data);
        } catch (error) {
            console.error("Error fetching imposePenalties:", error);    
        }    
      }

    
      const fetchCenterFarmers = async () => {
        try {
          const data = await myFetch("/api/centerFarmers?centerId="+authUser?._id);
          console.log(data);
          
            setCenterFarmerData(data);
        //   setLoading(false); // Set loading to false in case of an error
        } catch (error) {
          console.error("Error fetching complaints:", error);    
        }
      };

      const fetchCenterVans = async (page) => {
        try {
        let url = `/api/centerVans?centerId=`+authUser?._id;
        let data = await myFetch(url); 
        // console.log(data);
        setCenterVanData(data);
        } catch (error) {
            console.error("Error fetching imposePenalties:", error);    
        }    
      }

      useEffect(() => {
        // Fetch complaints when the component mounts
        // In this example, fetching from an API
        if (authUser?.role === "center"){
            fetchCenterFarmers();
            fetchCenterVans();
        }

        if (authUser?.role === "farmer"){
            fetchFarmerCows();
            fetchFarmerContainers();
        }
      }, [authUser]);

    return (
        <DataContext.Provider value={{ fetchFarmerCows,  fetchFarmerContainers, fetchCenterVans, fetchCenterFarmers, centerFarmerData, centerVanData, farmerCowData, farmerContainerData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    return useContext(DataContext);
};
  