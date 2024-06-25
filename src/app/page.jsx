"use client";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import { useUserSession } from "./context/UserSessionContext";
import TablaEventos from "@/components/eventos/TablaEventos";

const Home = ({ id, nombreevento, cantinvi, onDelete, FechaEvento }) => {
  const [eventos, setEventos] = useState([]);
  const { user } = useUserSession();

  useEffect(() => {
    async function fetchEventos() {
      const { data: eventos, error } = await supabase
        .from("evento")
        .select()
        .eq("userID", user.id);
      if (error) {
        console.error("Error fetching eventos:", error.message);
      } else {
        setEventos(eventos);
      }
    }
    fetchEventos();
  }, [user]);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
        <Link href="/eventos/crear-evento" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Crear evento
        </Link>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:items-start justify-center">
        {/* Tarjeta de evento */}
        <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg mb-4 sm:mb-0 sm:ml-4 w-full max-w-lg">
          <h1 className="text-xl font-bold mb-2">Próximo evento</h1>
          <div className="flex items-center mb-4">
            <img
              src="Favicon.ico"
              className="h-5 w-5 mr-2"
              alt="Icono de la aplicación"
            ></img>
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                <strong>{nombreevento || "Casamiento de Jazmín"}</strong>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <strong> Fecha: </strong>
                {FechaEvento || "20 de Julio 2024"}
              </p>
              <p className="text-gray-600 text-sm">
                📍Victoria Ocampo 100, CAutónoma de Buenos Aires
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
              <p className="text-2xl text-black mb-2 sm:mb-0">
                <strong>Estado de invitaciones</strong>
              </p>
              <div className="sm:ml-4">
                <p className="text-sm text-gray-600 bg-gray-200 p-2 rounded-sm">
                  🟢Enviadas
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-3">
              <div className="inline-block bg-gray-200 p-2 rounded-sm">
                <strong>120/480</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <TablaEventos userId={user.id} />
    </div>
  );
};

export default withAuth(Home);
