"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';
import { LockOpenIcon } from '@heroicons/react/solid';
import { usePathname } from 'next/navigation'; 

function Navbar() {
  const [isSpecificPage, setIsSpecificPage] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // Verifica si la ruta actual coincide con el patrón /eventos/[id]
    const isEventoPage = pathname.startsWith('/eventos/') && pathname.split('/').length === 3;
    setIsSpecificPage(isEventoPage);
  }, [pathname]);
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Menú a la izquierda */}
      <div className="flex items-center">
        <h1> 
          <img src= '/favicon.ico' alt= '' style={{width: '80px', height: '80px'}}/> 
        </h1>
      </div>
      {/* Elementos centrados */}
      <div className="flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <span className="text-white hover:text-gray-300 cursor-pointer">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/eventos">
              <span className="text-white hover:text-gray-300 cursor-pointer">Eventos</span>
            </Link>
          </li>
          {isSpecificPage && (
            <>
              <li>
                <Link href="/eventos/presupuesto">
                  <div className="text-white hover:text-gray-300">Presupuestos</div>
                </Link>
              </li>
              <li>
                <Link href="/eventos/reportes">
                  <div className="text-white hover:text-gray-300">Reportes</div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Botones de Iniciar Sesión y Premium */}
      <div className="flex items-center">
        {/* Botón Premium */}
        <button className="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600 mr-2">
          <div className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl font-bold w-full h-full">
            <div className="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1 inline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                ></path>
              </svg>
              Premium
            </div>
          </div>
        </button>
        {/* Botón de iniciar sesión */}
        <Link href="/auth/login">
          <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-hray-50 hover:bg-green-600 text-white dark:bg-gray-700 dark:text-white dark:text-white dark:hover:text-gray-200 dark:shadow-none group ml-2">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-600 group-hover:h-full"></span>
            <LockClosedIcon className="h-5 w-5 text-white group-hover:text-indigo-400" aria-hidden="true"/>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              {/* Aquí deberías agregar el icono de cerrar sesión */}
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <LockOpenIcon className="h-5 w-5 text-white group-hover:text-indigo-400" aria-hidden="true"/>
              {/* Aquí deberías agregar el icono de iniciar sesión */}
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">Iniciar Sesión</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
