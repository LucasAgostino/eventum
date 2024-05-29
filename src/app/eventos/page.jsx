"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/utils/supabase';
import EventoCard from '@/components/EventoCard';
import { IconTrash } from '@tabler/icons-react';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoIdToDelete, setEventoIdToDelete] = useState(null);


  useEffect(() => {
    async function fetchEventos() {
      const { data: eventos, error } = await supabase.from('evento').select();
      if (error) {
        console.error('Error fetching eventos:', error.message);
      } else {
        setEventos(eventos);
      }
    }
    fetchEventos();
  }, []);


  const handleDelete = async (eventoId) => {
    const { error } = await supabase.from('evento').delete().eq('id', eventoId);
    if (error) {
      console.error('Error deleting evento:', error.message);
    } else {
      setEventos(eventos.filter(evento => evento.id !== eventoId));
    }
  };

  const confirmarEliminacion = (eventoId) => {
    setEventoIdToDelete(eventoId);
  };

  const cancelarEliminacion = () => {
    setEventoIdToDelete(null);
  };

  const confirmarEliminacionHandler = () => {
    handleDelete(eventoIdToDelete);
    setEventoIdToDelete(null);
  };

  return (
    <div>
      {eventoIdToDelete && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 py-5 sm:px-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Reemplaza el SVG de la cruz con el ícono de tacho de basura */}
                    <IconTrash size={20} />
                    
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-white">Eliminar evento</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">¿Estás seguro de que deseas eliminar este evento?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmarEliminacionHandler} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Sí, eliminar
                </button>
                <button onClick={cancelarEliminacion} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="m-4 text-5xl font-bold text-blue-900">Lista de Eventos</h1>
      <div className="relative inline-flex items-center justify-center p-4 rounded-full transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95 m-4">
        <Link href="/eventos/crear-evento">
          Crear evento
        </Link>
      </div>
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 bg-blue-900 border border-gray-300">
  <thead className="bg-gray-50">
    <tr className='bg-blue-700 hover:bg-blue-600 rounded-t-lg rounded-b-lg'>
      <th scope="col" className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left">Imagen</th>
      <th scope="col" className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left">Nombre del Evento</th>
      <th scope="col" className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left">Fecha del Evento</th>
      <th scope="col" className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left">Cantidad de Invitados</th>
      <th scope="col" className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left">Acciones</th>
    </tr>
  </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {eventos.map(evento => (
            <tr key={evento.id} className='hover:shadow-lg'>
              <td className="px-6 py-4 bg-blue-800 border border-black">
                <img src='/user.ico' alt='User Icon' className='w-10 h-10'/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-black">{evento.nombreEvento}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-black">{evento.fecha}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-black">{evento.cantInvitados}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                {/* Contenedor flex para los iconos */}
                <div className="flex">
                  {/* Botón de eliminar con ícono */}
                  <button onClick={() => confirmarEliminacion(evento.id)} className="text-red-600 hover:text-red-900">
                    <IconTrash size={25} />
                  </button>
                  {/* Botón de editar con ícono */}
                  <Link href={`/eventos/${evento.id}`} passHref>
                  <button className="ml-2 text-blue-600 hover:text-blue-900">
                    {/* Reemplaza el ícono por el correspondiente al editar */}
                    <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  </Link>
                </div>
              </td>
  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Eventos;
