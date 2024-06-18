"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const menuItems = (eventId) =>
  [
    { path: "/home", icon: "/hogar.png", text: "Home" },
    { path: "/eventos", icon: "/Calendario.png", text: "Eventos" },
    eventId && {
      path: `/eventos/${eventId}/presupuesto`,
      icon: "/dolar.png",
      text: "Presupuestos",
    },
    eventId && {
      path: `/eventos/${eventId}/reportes`,
      icon: "/grafico-histograma.png",
      text: "Reportes",
    },
    eventId && {
      path: `/eventos/${eventId}/invitados`,
      icon: "/user.png",
      text: "Invitados",
    },
    // Añade más elementos aquí
  ].filter((item) => item); // Filtra elementos falsy (null, undefined, false)

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/register", "/home"];
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
    return router.asPath === path;
  }

  function handleMouseEnter() {
    setIsMenuOpen(true);
  }

  function handleMouseLeave() {
    setIsMenuOpen(false);
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
          className={`bg-blue-900 min-h-screen text-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? "w-48" : "w-20"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-blue-800 backdrop-blur-sm border border-blue-700 shadow-lg p-4 rounded-lg min-h-screen flex flex-col justify-between">
            <nav>
              <ul>
                <li className="p-3 flex items-center cursor-pointer">
                  <img src="/menu.png" className="h-5 w-5" alt="Menu Icon" />
                  {isMenuOpen && <span className="ml-2 text-sm">Menú</span>}
                </li>
                {menuItems(eventId).map(({ path, icon, text }) => (
                  <li
                    key={path}
                    className={`p-3 flex items-center ${
                      isActive(path) ? "bg-blue-700 shadow-lg" : ""
                    }`}
                  >
                    <Link href={path} legacyBehavior>
                      <a className="flex items-center w-full">
                        <img
                          src={icon}
                          className="h-5 w-5"
                          alt={`${text} Icon`}
                        />
                        {isMenuOpen && (
                          <span className="ml-2 text-sm">{text}</span>
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-3">
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <img
                    src="/logout.png"
                    className="h-5 w-5"
                    alt="Cerrar Sesión Icon"
                  />
                  {isMenuOpen && (
                    <span className="ml-2 text-sm">Cerrar sesión</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
