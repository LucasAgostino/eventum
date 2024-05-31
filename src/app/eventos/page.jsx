"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase";
import EventoCard from "@/components/EventoCard";
import { IconTrash } from "@tabler/icons-react";
import PopUpEliminar from "@/components/PopUpEliminar";
import withAuth from "../utils/withAuth";
import { useUserSession } from "../context/UserSessionContext";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoIdToDelete, setEventoIdToDelete] = useState(null);
  const {user} = useUserSession();

  useEffect(() => {
    async function fetchEventos() {
      const { data: eventos, error } = await supabase.from("evento").select().eq('userID',user.id);;
      if (error) {
        console.error("Error fetching eventos:", error.message);
      } else {
        setEventos(eventos);
      }
    }
    fetchEventos();
  }, [user]);

  const confirmarEliminacion = (eventoId) => {
    setEventoIdToDelete(eventoId);
  };

  const cancelarEliminacion = () => {
    setEventoIdToDelete(null);
  };

  const handleDelete = (eventoId) => {
    setEventos(eventos.filter((evento) => evento.id !== eventoId));
  };

  return (
    <div>
      {eventoIdToDelete && (
        <PopUpEliminar
          eventoId={eventoIdToDelete}
          onCancel={cancelarEliminacion}
          onDelete={handleDelete}
        />
      )}

      <h1 className="m-4 text-5xl font-bold text-blue-900">Lista de Eventos</h1>
      <div className="relative inline-flex items-center justify-center p-4 rounded-full transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95 m-4">
        <Link href="/eventos/crear-evento">Crear evento</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-blue-900 border border-gray-300">
          <thead className="bg-gray-50">
            <tr className="bg-blue-700 hover:bg-blue-600 rounded-t-lg rounded-b-lg">
              <th
                scope="col"
                className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left"
              >
                Nombre del Evento
              </th>
              <th
                scope="col"
                className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left"
              >
                Fecha del Evento
              </th>
              <th
                scope="col"
                className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left"
              >
                Cantidad de Invitados
              </th>
              <th
                scope="col"
                className="px-6 py-4 whitespace-nowrap text-sm text-white bg-blue-800 border border-black text-left"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eventos.map((evento) => (
              <tr key={evento.id} className="hover:shadow-lg">
                <td className="px-6 py-4 bg-blue-800 border border-black ">
                  <img src="/user.ico" alt="User Icon" className="w-10 h-10 rounded-2xl" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  {evento.nombreEvento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  {evento.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  {evento.cantInvitados}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-black">
                  <div className="flex">
                    <button
                      onClick={() => confirmarEliminacion(evento.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IconTrash size={25} />
                    </button>
                    <Link href={`/eventos/${evento.id}`} passHref>
                      <button className="ml-2 text-blue-600 hover:text-blue-900">
                        <svg
                          className="w-6 stroke-green-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
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

export default withAuth(Eventos);
