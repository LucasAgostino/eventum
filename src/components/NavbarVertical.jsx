"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const menuItems = (eventId) =>
  [
    { path: "/", icon: "/hogar.png", text: "Dashboard" },
    { path: "/eventos", icon: "/Calendario.png", text: "Eventos" },
    eventId && {
      path: `/eventos/${eventId}`,
      icon: "/archivo.png",
      text: "Detalles",
    },
    eventId && {
      path: `/eventos/${eventId}/presupuesto`,
      icon: "/dolar.png",
      text: "Presupuestos",
    },
    eventId && {
      path: `/eventos/${eventId}/invitados`,
      icon: "/user.png",
      text: "Invitados",
    },
    eventId && {
      path: `/eventos/${eventId}/mesas`,
      icon: "/mesa-redonda.png",
      text: "Mesas",
    },
    // Añade más elementos aquí
  ].filter((item) => item); // Filtra elementos falsy (null, undefined, false)

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/register", "/home","/reset-password", "/update-password"];
  const hideNavbarOnDynamicRoutes = pathname.startsWith("/confirm/");
  const [eventId, setEventId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showNavbar =
    !noNavbarRoutes.includes(pathname) && !hideNavbarOnDynamicRoutes;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      router.push("/login");
    }
  };

  function isActive(path) {
    return pathname === path;
  }

  function handleMouseEnter() {
    if (window.innerWidth >= 640) { // solo permite desplegarse en modo escritorio
      setIsMenuOpen(true);
    }
  }

  function handleMouseLeave() {
    if (window.innerWidth >= 640) { // solo permite desplegarse en modo escritorio
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length >= 3 && pathParts[1] === "eventos") {
      setEventId(pathParts[2]);
    } else {
      setEventId(null);
    }
  }, [pathname]);

  return (
    <div>
      {showNavbar && (
        <div
          className={`bg-violeta min-h-screen text-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "w-48" : "w-20"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-violeta backdrop-blur-sm shadow-lg p-4 rounded-lg min-h-screen flex flex-col">
            <nav className="flex-grow">
              <ul>
                <li className="p-3 flex items-center cursor-pointer mb-10">
                  <img src="/menu.png" className="h-5 w-5" alt="Menu Icon" />
                  <span
                    className={`ml-2 text-sm transition-opacity duration-300 ${
                      isMenuOpen ? "opacity-100" : "opacity-0"
                    } sm:block hidden`}
                  >
                    Menú
                  </span>
                </li>
                {menuItems(eventId).map(({ path, icon, text }) => (
                  <li
                    key={path}
                    className={`p-3 flex items-center ${
                      isActive(path) ? "bg-black/25 shadow-lg rounded-lg" : ""
                    }`}
                  >
                    <Link href={path} legacyBehavior>
                      <a className="flex items-center w-full mb-2 mt-2">
                        <img
                          src={icon}
                          className="h-5 w-5"
                          alt={`${text} Icon`}
                        />
                        <span
                          className={`ml-2 text-sm transition-opacity duration-300 ${
                            isMenuOpen ? "opacity-100" : "opacity-0"
                          } sm:block hidden`}
                        >
                          {text}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto mb-20  px-3">
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full"
                >
                  <img
                    src="/logout.png"
                    className="h-5 w-5"
                    alt="Cerrar Sesión Icon"
                  />
                  <span
                    className={`ml-2 text-sm transition-opacity duration-300 ${
                      isMenuOpen ? "opacity-100" : "opacity-0"
                    } sm:block hidden`}
                    style={{
                      width: isMenuOpen ? "auto" : "0px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cerrar sesión
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
