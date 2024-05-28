import React from 'react';
import { IconTrash } from '@tabler/icons-react';
import Link from 'next/link';


function EventoCard({ id, nombreevento, cantinvi, onDelete, FechaEvento }) {
  return (
    <div className="w-72 h-50 bg-gray-800 rounded-lg m-4">
      <div className="flex flex-col justify-center items-center h-full p-4">
        <div className="flex justify-center items-center w-16 h-16 p-3 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
          <svg className="logo-svg" viewBox="0 0 29.667 31.69" xmlns="http://www.w3.org/2000/svg" fill="white">
            {/* Icono */}
          </svg>
        </div>
        <div className="max-w-xs h-auto space-y-2">
          <h2 className="text-white text-lg font-bold tracking-wider">{nombreevento}</h2>
          <p className="text-xs text-gray-200">Cantidad de invitados: {cantinvi}</p>
          {/* Nuevo párrafo para mostrar día y mes */}
          <p className="text-xs text-gray-200">Fecha: {FechaEvento} </p>
          <div className="flex justify-center items-center my-1">
            <Link href={`/eventos/${id}`} passHref>
              <button className="mx-4 px-2 border-2 border-white p-1 rounded-md text-white font-semibold shadow-lg shadow-white hover:scale-75 duration-500">Ver más</button>
            </Link>   
            <button 
              onClick={onDelete} 
              className="px-4 py-2 bg-red-600 p-1 rounded-md text-white font-semibold shadow-xl shadow-red-500/50 hover:ring-2 ring-red-400 hover:scale-75 duration-500"
            >
              <IconTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EventoCard;
