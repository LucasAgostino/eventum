"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [isSpecificPage, setIsSpecificPage] = useState(false);
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/register", "/home"];
  const hideNavbarOnDynamicRoutes = pathname.startsWith("/confirm/");
  const [eventId, setEventId] = useState(null);

  const showNavbar = !noNavbarRoutes.includes(pathname) && !hideNavbarOnDynamicRoutes;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    // Supongamos que puedes obtener el id desde el pathname o alguna otra lógica
    const pathParts = pathname.split("/");
    if (pathParts.length >= 3 && pathParts[1] === "eventos") {
      setEventId(pathParts[2]);
    } else {
      setEventId(null);
    }

    const isEventoPage =
      pathname.startsWith("/eventos/") && pathname.split("/").length === 3;
    setIsSpecificPage(isEventoPage);
  }, [pathname]);

  return (
    <div>
      {showNavbar && (
        <nav className="bg-custom-blue p-4 flex justify-between items-center font-bold">
          <div className="flex items-center">
            <h1>
              <Link href="/">
                <img
                  src="/favicon.ico"
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                />
              </Link>
            </h1>
          </div>
          <div className="flex justify-center">
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <span className="text-white hover:text-gray-300 cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/eventos">
                  <span className="text-white hover:text-gray-300 cursor-pointer">
                    Eventos
                  </span>
                </Link>
              </li>
              {isSpecificPage && (
                <>
                  <li>
                  < Link href={`/eventos/${eventId}/presupuesto`}>
                    <div className="text-white hover:text-gray-300">
                        Presupuestos
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/eventos/reportes">
                      <div className="text-white hover:text-gray-300">
                        Reportes
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 hover:bg-red-600 text-gray-900 hover:text-white group ml-2"
            >
              <span className="absolute inset-0 bg-red-600 transition-all duration-150 ease-in-out transform -translate-x-full group-hover:translate-x-0"></span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Cerrar sesión
              </span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
