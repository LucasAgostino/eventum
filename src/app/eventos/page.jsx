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
        <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violeta hover:bg-violoscuro focus:outline-none focus:ring-2 focus:ring-offset-2">
          <Link href="/crear-evento">Crear evento</Link>
        </div>
      </div>
      <TablaEventos userId={user.id} />
    </div>
  );
}

export default withAuth(Eventos);
