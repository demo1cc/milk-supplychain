import React from "react";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { token, logout, authUser } = useAuth();
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div> */}
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <div className="text-xl">
          {!token && <Link
            href={"/"}
            className="btn btn-ghost normal-case text-xl text-primary"
          >
            Milk-SC
          </Link> }

          {token && <Link
            href={authUser?.role==="farmer"?"/farmer-dashboard":"/center-dashboard"}
            className="btn btn-ghost normal-case text-xl text-primary"
          >
            Milk-SC
          </Link> }
        </div>
        {token && 
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal flex items-center px-1">
            {/* <li>
              <Link href="/dashboard">Dashboard</Link>
            </li> */}
            {/* <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Hover
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div> */}
            {/* <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
}
      </div>
        
      <div className="navbar-end">
        <div className="relative">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <PiUser size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44 absolute left-auto right-0"
            >
              {/* <li>
                <Link href="#" className="justify-between">
                  Profile
                </Link>
              </li> */}
              <li>
                {token && (
                  <button className="justify-between" onClick={logout}>
                    Logout
                  </button>
                )}
                {!token && (
                  <Link href={"/login"}>
                    <span className="justify-between">Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
