import React from "react";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {

  const {token, logout} = useAuth();
  return (
    //     <div
    //       className="navbar bg-base-200 "
    //     //   style={{ borderBottom: "1.4px solid #a4a4a4" }}
    //     >
    //       <div className="flex-1">
    //         <Link
    //           href={"/"}
    //           className="btn btn-ghost normal-case text-xl text-primary"
    //         >
    //           Milk-Supplychain
    //         </Link>
    //       </div>
    //       <div className="flex-none">
    //         <ul className="menu menu-horizontal dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

    //           <li>
    //             <Link href="#">Dashboard</Link>
    //           </li>

    //           <li>
    //             <Link href="#">Contact</Link>
    //           </li>
    // {/*
    //             <li>
    //               <Link href="#">
    //                 Login
    //               </Link>
    //             </li>
    //          */}

    //             <div className="dropdown dropdown-end">
    //               <div
    //                 tabIndex={0}
    //                 role="button"
    //                 className="btn btn-ghost btn-circle avatar"
    //               >
    //                   <PiUser size={24} />
    //                   {/* <img
    //                     alt="Member Profile"
    //                     src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    //                   /> */}
    //               </div>
    //               <ul
    //                 tabIndex={0}
    //                 className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    //               >
    //                 <li>
    //                   <Link href="#" className="justify-between">
    //                     Profile
    //                     {/* <span className="badge">New</span> */}
    //                   </Link>
    //                 </li>
    //                 {/* <li>
    //                   <a>Settings</a>
    //                 </li> */}
    //                 <li>
    //                   <button>Logout</button>
    //                 </li>
    //               </ul>
    //             </div>

    //         </ul>
    //       </div>
    //     </div>
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
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

          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
               <Link href="#">Dashboard</Link>
              {" "}
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul> */}
        </div>
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <div className="btn btn-ghost text-xl">
          <Link
            href={"/"}
            className="btn btn-ghost normal-case text-xl text-primary"
          >
            Milk-Supplychain
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li>
             <Link href="#">Dashboard</Link>
      </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        {token && <button className="btn" onClick={logout}>Logout</button>}
        {!token && 
        <Link href={"/login"}>
        <button className="btn">Login</button>
        </Link>
        }

      </div>
    </div>
  );
};
export default Navbar;
