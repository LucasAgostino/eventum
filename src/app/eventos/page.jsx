"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import withAuth from '@/utils/withAuth'
import { useUserSession } from "../context/UserSessionContext";
import EliminarEvento from "@/components/EliminarEvento";
import VisualizarEvento from "@/components/VisualizarEvento"

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const { user } = useUserSession();

  useEffect(() => {
    async function fetchEventos() {
      const { data: eventos, error } = await supabase.from("evento").select().eq('userID', user.id);
      if (error) {
        console.error("Error fetching eventos:", error.message);
      } else {
        setEventos(eventos);
      }
    }
    fetchEventos();
  }, [user]);

  const handleDelete = (eventoId) => {
    setEventos(eventos.filter((evento) => evento.id !== eventoId));
  };

  return (
    <div>
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
                    <EliminarEvento evento={evento} onDelete={handleDelete} />
                    <VisualizarEvento eventoId = {evento.id}> </VisualizarEvento>
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
