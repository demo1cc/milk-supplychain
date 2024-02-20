import Link from "next/link"
export default function LoginRequired() {


    return(

<div className="hero min-h-screen bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Login Required</h1>
      <p className="py-6">Login is required to access this page.</p>
      <Link href={"/login"}>
      <button className="btn btn-primary">Get Started</button>
      </Link>
    </div>
  </div>
</div>
    )
}