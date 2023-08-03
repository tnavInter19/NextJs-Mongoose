import React from 'react'
import { useRouter } from "next/router";
import { ROLES } from "../utils/roles";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

function Navigation() {
 const router = useRouter();
 const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
 const userRole = "admin"; // Replace with the actual user role retrieved from your authentication system

 return (
  isLoggedIn &&
   <nav className="bg-blue-500 p-4">
     <div className="container mx-auto">
       <ul className="flex space-x-4">
         <li>
           <Link
             href="/"
             onClick={(e) => {
               e.preventDefault();
               router.push("/");
             }}
             className="text-white hover:text-blue-100 cursor-pointer"
           >
             Home
           </Link>
         </li>
         {userRole === ROLES.ADMIN && (
           <li>
             <Link
               href="/adminPanel"
               onClick={(e) => {
                 e.preventDefault();
                 router.push("/adminPanel");
               }}
               className="text-white hover:text-blue-100 cursor-pointer"
             >
               Admin Panel
             </Link>
           </li>
         )}
         {userRole === ROLES.ADMIN && (
           <li>
             <Link
               href="/dashboard"
               onClick={(e) => {
                 e.preventDefault();
                 router.push("/dashboard");
               }}
               className="text-white hover:text-blue-100 cursor-pointer"
             >
               Dashboard
             </Link>
           </li>
         )}
       </ul>
     </div>
   </nav>
 );
};

export default Navigation;