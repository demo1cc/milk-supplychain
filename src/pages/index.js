
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
    <h1>Home</h1>
  );
}
