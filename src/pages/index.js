
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/router";


export default function Home() {
  const {token, authUser} = useAuth();
  const router = useRouter();


  React.useEffect(() => {
    if (authUser) {
      if (authUser?.role === "farmer") {
        router.push('/farmer-dashboard');
      } else {
        router.push('/center-dashboard');
      }
  }
  }, [authUser]);

  // React.useEffect(() => {
  //   const fetchUsers = async () => {
  //     let data = await myFetch("/api/users");
  //     console.log(data);
  //   };
  //   fetchUsers();
  // }, []);
  return (
    <div className="hero min-h-screen bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Milk Supply Chain</h1>
      <p className="py-6">This App is only for demo purpose. The App is developed by Coding Chaska Team</p>
    <a href="https://www.codingchaska.com/"> <button className="btn btn-primary">Visit Coding Chaska</button> </a> 
    </div>
  </div>
</div>
  );
}
