// components/Popup.js
import React from "react";

export default function Popup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          <svg
            className="w-6 h-6 text-gray-600 hover:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-yellow-500 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856C18.627 19.837 19 18.943 19 18V6c0-.943-.373-1.837-1.05-2.494A3.476 3.476 0 0014.844 3H9.156C8.084 3 7.107 3.368 6.45 4.006A3.492 3.492 0 005 6v12c0 .943.373 1.837 1.05 2.494z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-3 text-yellow-500">Alerta</h2>
        </div>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
