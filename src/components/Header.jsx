// components/Header.jsx

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const noHeaderRoutes = ["/login", "/register", "/home", "/reset-password", "/update-password"];
  const hideHeaderOnDynamicRoutes = pathname.startsWith("/confirm/");

  const showHeader = !noHeaderRoutes.includes(pathname) && !hideHeaderOnDynamicRoutes;

  return (
    <>
      {showHeader && (
        <header className="bg-[#1B264F] p-4" style={{height:70}}>
          <div className="container mx-auto flex justify-center items-center w-full">
            <Link href="/">
              <img src="/Logo_Eventum_Title.png" alt="Logo" style={{height:46}}/>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
