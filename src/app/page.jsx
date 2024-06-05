"use client";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import withAuth from "@/utils/withAuth";
import { useUserSession } from "./context/UserSessionContext";
import TablaEventos from "@/components/TablaEventos";

const Home = ({ id, nombreevento, cantinvi, onDelete, FechaEvento }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia al objeto Chart
  const [idEventoSeleccionado, setIdEventoSeleccionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [nombreEvento, setNombreEvento] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cantInvitados, setcantInvitados] = useState(0);
  const [fecha, setFecha] = useState("");
  const [presupuestoEstimado, setPresupuestoEstimado] = useState(0);
  const fechaFormateada = fecha.split("/").reverse().join("-");
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

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    const data = {
      datasets: [
        {
          label: "My First Dataset",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    // Destruye el gráfico anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crea un nuevo gráfico y guarda la instancia para poder destruirlo más tarde
    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });

    // Devuelve una función para limpiar el gráfico al desmontar el componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (idEventoSeleccionado) {
      const eventoSeleccionado = eventos.find(
        (evento) => evento.id === idEventoSeleccionado
      );
      if (eventoSeleccionado) {
        setFecha(eventoSeleccionado.fecha);
      }
    }
  }, [idEventoSeleccionado, eventos]);

  const handleDelete = (eventoId) => {
    setEventos(eventos.filter((evento) => evento.id !== eventoId));
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="relative inline-flex items-center justify-center p-2 px-4 rounded-lg transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95">
          <Link href="/eventos/crear-evento">Crear evento</Link>
        </div>
      </div>
      <div className="flex flex-file justify-center">
        {/* Tarjeta de evento */}
        <div
          className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg ml-4"
          style={{ height: "400px", width: "800px" }}
        >
          <h1 className="text-xl font-bold mb-2">Próximo evento</h1>
          <div className="flex items-center mb-">
            <img
              src="Favicon.ico"
              className="h-20px w-20px"
              alt="Icono de la aplicación"
            ></img>
            <div>
              <h2 className="text-3xl font-semibold mb-12">
                <strong>{nombreevento}Casamiento de Jazmín</strong>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <strong> Fecha: </strong>
                {FechaEvento}20 de Julio 2024
              </p>
              <p className="text-gray-600 text-sm">
                📍Victoria Ocampo 100, CAutónoma de Buenos Aires
              </p>
            </div>
          </div>
          <div>
            <div className="flex mt-10">
              <p className="text-2xl text-black">
                <strong>Estado de invitaciones </strong>
              </p>
              <div>
                <p className="text-sm text-gray-600 ml-10 bg-gray-200 p-2 rounded-sm">
                  🟢Enviadas{" "}
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

        {/*} <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg" style={{ height: '300', width: '800px' }}>
          <div className='flex'>
            <h2 className="text-xl font-bold mb-2">Próximo evento</h2>
            <div className="flex items-center mb-4">
              <img src='/favicon.ico' alt="Icono del evento" className="w-20 h-20" />
            <div>
                <h3 className="text-lg font-semibold">{nombreEvento}Casamiento de Jazmín</h3>
                <p className="text-gray-600 text-sm">Fecha: {FechaEvento}</p>
                <p className="text-gray-600 text-sm">Victoria Ocampo 100, CAutónoma de Buenos Aires</p>
              </div>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="text-sm text-gray-600">Estado de invitaciones: Enviadas 120/480</p>
            </div>
          </div>
          
    </div> */}
        {/* Chart a la derecha */}
        <div
          className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg ml-4"
          style={{ height: "400px", width: "800px" }}
        >
          <div className="px-10 py-6 flex justify-between items-center">
            <h3 className="text-zinc-900 dark:text-black text-2xl">
              <strong>Progress</strong>
            </h3>

            <div className="flex items-center justify-center">
              <canvas
                ref={chartRef}
                style={{ maxHeight: "200px", maxWidth: "600px" }}
              ></canvas>
            </div>
            <svg
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-zinc-900 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <div className="px-5 pb-5">
            <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
              File: var/test/admin.php extracted..
            </p>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
              <div
                style={{ width: "70%" }}
                className="bg-blue-600 h-2.5 rounded-full"
              ></div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                70% Complete
              </span>
              <button className="text-xs text-blue-600 hover:underline">
                Details
              </button>
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
