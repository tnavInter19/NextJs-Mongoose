import Link from 'next/link';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const TopNavBar: React.FC = () => {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

 const toggleMobileMenu = () => {
   setIsMobileMenuOpen(!isMobileMenuOpen);
 };
  return (
   isLoggedIn &&
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <p className="text-white text-xl font-semibold">Your Logo</p>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <p className="text-white">Home</p>
            </Link>
            <Link href="/about">
              <p className="text-white">About</p>
            </Link>
            {/* Add more navigation links here */}
          </div>
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          {/* Add a responsive menu button for mobile */}
          {/* Example: <MobileMenuButton /> */}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
