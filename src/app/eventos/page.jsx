"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import withAuth from "@/utils/withAuth";
import { useUserSession } from "../context/UserSessionContext";
import TablaEventos from "@/components/eventos/TablaEventos";

function Eventos() {
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
    <div>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-3xl font-bold text-gray-900">Mis eventos</h1>
        <div className="relative inline-flex items-center justify-center p-2 px-4 rounded-lg transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95">
          <Link href="/eventos/crear-evento">Crear evento</Link>
        </div>
      </div>
      <TablaEventos userId={user.id} />
    </div>
  );
}

export default withAuth(Eventos);
