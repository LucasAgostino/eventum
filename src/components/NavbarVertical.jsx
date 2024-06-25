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

export default function NavbarVertical() {
  const router = useRouter();
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/register", "/home"];
  const hideNavbarOnDynamicRoutes = pathname.startsWith("/confirm/");
  const [eventId, setEventId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div>
          {/* Mobile Menu Button */}
          <div className="bg-blue-800 p-4 flex justify-between items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <img src="/menu.png" className="h-8 w-8" alt="Menu Icon" />
            </button>
          </div>
          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-blue-900 text-white transition-transform duration-300 ease-in-out transform md:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="bg-blue-800 backdrop-blur-sm border border-blue-700 shadow-lg p-4 rounded-lg h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="focus:outline-none"
                >
                  <img src="/menu.png" className="h-8 w-8" alt="Menu Icon" />
                </button>
              </div>
              <nav className="flex-grow">
                <ul>
                  {menuItems(eventId).map(({ path, icon, text }) => (
                    <li
                      key={path}
                      className={`p-3 flex items-center ${
                        isActive(path)
                          ? "bg-blue-700 shadow-lg rounded-lg"
                          : ""
                      }`}
                    >
                      <Link href={path} legacyBehavior>
                        <a className="flex items-center w-full mb-2 mt-2">
                          <img
                            src={icon}
                            className="h-5 w-5"
                            alt={`${text} Icon`}
                          />
                          <span className="ml-2 text-sm">{text}</span>
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
                    className="flex items-center w-full"
                  >
                    <img
                      src="/logout.png"
                      className="h-5 w-5"
                      alt="Cerrar Sesión Icon"
                    />
                    <span className="ml-2 text-sm">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className={`bg-blue-900 min-h-screen text-white transition-all duration-300 ease-in-out hidden md:block ${
              isMenuOpen ? "w-48" : "w-20"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-blue-800 backdrop-blur-sm border border-blue-700 shadow-lg p-4 rounded-lg min-h-screen flex flex-col justify-between">
              <nav>
                <ul>
                  <li className="p-3 flex items-center cursor-pointer mb-10">
                    <img src="/menu.png" className="h-5 w-5" alt="Menu Icon" />
                    <span
                      className={`ml-2 text-sm transition-opacity duration-300 ${
                        isMenuOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Menú
                    </span>
                  </li>
                  {menuItems(eventId).map(({ path, icon, text }) => (
                    <li
                      key={path}
                      className={`p-3 flex items-center ${
                        isActive(path)
                          ? "bg-blue-700 shadow-lg rounded-lg"
                          : ""
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
                            }`}
                          >
                            {text}
                          </span>
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
                      }`}
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
        </div>
      )}
    </div>
  );
}
