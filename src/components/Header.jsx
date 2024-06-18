// components/Header.jsx

import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white p-4 flex items-center justify-between w-full fixed top-0 left-0 z-50">
      <div className="flex items-center mx-auto max-w-7xl w-full px-4">
        <div className="flex items-center">
          <img src="/tu_logo.png" alt="Logo de tu aplicación" className="h-8 mr-2" />
          <span className="text-xl font-bold">Eventum</span> {/* Nombre de tu aplicación */}
        </div>
      </div>
    </header>
  );
};

export default Header;
