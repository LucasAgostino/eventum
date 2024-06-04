"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import withAuth from '@/utils/withAuth'
import { useUserSession } from "../context/UserSessionContext";
import EliminarEvento from "@/components/EliminarEvento";
import VisualizarEvento from "@/components/VisualizarEvento"
import TablaEventos
 from "@/components/TablaEventos";
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
      
      <TablaEventos
        userId= {user.id}
      />

    </div>
  );
}

export default withAuth(Eventos);
