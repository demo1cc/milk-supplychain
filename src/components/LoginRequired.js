import Link from "next/link";
import { useRouter } from 'next/router';

import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

export default function LoginRequired() {

  const router = useRouter();
    const currentUrl = router.asPath;
    const {loginCheck} = useAuth();

    if (!loginCheck){
      return (
        <div className="bg-base-100 p-4">
          <Loading />
        </div>
      )
    }

    return(

<div className="hero min-h-screen bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Login Required</h1>
      <p className="py-6">Login is required to access this page.</p>
      <Link href={"/login?next="+currentUrl}>
      <button className="btn btn-primary">Login</button>
      </Link>
    </div>
  </div>
</div>
    )
}