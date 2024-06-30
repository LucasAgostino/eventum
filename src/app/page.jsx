"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import withAuth from "@/utils/withAuth";
import { useUserSession } from "./context/UserSessionContext";
import TablaEventos from "@/components/eventos/TablaEventos";
import TarjetaEventoProximo from "@/components/eventos/TarjetaEventoProximo";
import GraficoDashboard from "@/components/GraficoDashboard";


const Home = () => {
  const { user } = useUserSession();
  const [proximoEvento, setProximoEvento] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [presupuestoMax, setPresupuestoMax] = useState(0);

  useEffect(() => {
    async function fetchEventos() {
      const { data: eventos, error } = await supabase
        .from("evento")
        .select()
        .eq("userID", user.id)
        .order("fecha", { ascending: true });

      if (error) {
        console.error("Error fetching eventos:", error.message);
      } else {
        const ahora = new Date();
        const eventoProximo = eventos.find(evento => new Date(evento.fecha) >= ahora);
        setProximoEvento(eventoProximo);
        if (eventoProximo) {
          setPresupuestoMax(eventoProximo.presupuestoEstimado);
          fetchGastos(eventoProximo.id);
        }
      }
    }

    async function fetchGastos(eventoId) {
      const { data: gastos, error } = await supabase
        .from("gasto")
        .select()
        .eq("eventoId", eventoId);

      if (error) {
        console.error("Error fetching gastos:", error.message);
      } else {
        setExpenses(gastos);
      }
    }

    if (user) {
      fetchEventos();
    }
  }, [user]);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
        <Link href="/crear-evento" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violeta hover:bg-violoscuro focus:outline-none focus:ring-2 focus:ring-offset-2">
            Crear evento
        </Link>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:items-start justify-center">
        <TarjetaEventoProximo/>
        <GraficoDashboard expenses = {expenses} presupuestoMax = {presupuestoMax} />
      </div>
      <br />
      <TablaEventos userId={user.id} flag = {true} />
    </div>
  );
};

export default withAuth(Home);