import Link from "next/link"
export default function PageNotFound() {


    return (
        <div className="hero min-h-screen bg-base-100">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Page Not Found</h1>
      <p className="py-6">This page is not available.</p>
      <Link href={"/"}>
      <button className="btn btn-primary">Go to Home Page</button>
      </Link>
    </div>
  </div>
</div>
    )
}