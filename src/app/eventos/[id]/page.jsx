"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/utils/withAuth";
import dynamic from "next/dynamic";
import Checklist from "@/components/CheckList";

// Importar dinámicamente EventMap para evitar problemas de SSR
const EventMap = dynamic(() => import("@/components/EventMap"), { ssr: false });

function EventoDetalles({ params }) {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nombreEvento, setNombreEvento] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cantInvitados, setCantInvitados] = useState(0);
  const [fecha, setFecha] = useState("");
  const [presupuestoEstimado, setPresupuestoEstimado] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("evento")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setEvent(data);
        setNombreEvento(data.nombreEvento);
        setUbicacion(data.ubicacion);
        setCantInvitados(data.cantInvitados);
        setFecha(data.fecha);
        setDetalle(data.Detalle);
        setPresupuestoEstimado(data.presupuestoEstimado.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleEditar = () => {
    setEditing(true);
  };

  const handleCancelar = () => {
    setEditing(false);
  };

  const handlePresupuestoChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Eliminar cualquier carácter no numérico
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const formattedValue = new Intl.NumberFormat('es-ES', options).format(value / 100);
    setPresupuestoEstimado(formattedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formattedPresupuesto = parseFloat(presupuestoEstimado.replace(/\./g, '').replace(/,/g, '.'));
      const { data, error } = await supabase
        .from("evento")
        .update({
          nombreEvento,
          ubicacion,
          cantInvitados,
          fecha,
          Detalle,
          presupuestoEstimado: formattedPresupuesto,
        })
        .eq("id", params.id);

      if (error) {
        throw error;
      }

      setEvent({
        ...event,
        nombreEvento,
        ubicacion,
        cantInvitados,
        fecha,
        Detalle,
        presupuestoEstimado: formattedPresupuesto,
      });
      console.log("Evento actualizado:", data);
      setEditing(false);
    } catch (error) {
      console.error("Error al actualizar el evento:", error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gray-50 p-4 lg:p-8">
      {editing ? (
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded px-4 pt-4 pb-4 lg:px-8 lg:pt-6 lg:pb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-violeta">
            Editar Evento
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombreEvento"
              >
                Nombre del Evento:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombreEvento"
                type="text"
                placeholder="Ingrese el nombre del evento"
                value={nombreEvento}
                onChange={(e) => setNombreEvento(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha"
              >
                Fecha:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ubicacion"
              >
                Ubicación:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ubicacion"
                type="text"
                placeholder="Ingrese la ubicación del evento"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripción:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Detalle"
                type="text"
                placeholder="Ingrese una descripción para el evento"
                value={Detalle}
                onChange={(e) => setDetalle(e.target.value)}
              />
            </div>
            <div className="flex flex-col lg:flex-row mb-4">
              <div className="w-full lg:w-1/2 lg:pr-2 mb-4 lg:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cantidadInvitados"
                >
                  Cantidad de Invitados:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cantidadInvitados"
                  type="number"
                  placeholder="Ingrese la cantidad de invitados"
                  value={cantInvitados}
                  onChange={(e) => setCantInvitados(e.target.valueAsNumber)}
                  required
                />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="presupuestoEstimado"
                >
                  Presupuesto Estimado:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="presupuestoEstimado"
                  type="text"
                  placeholder="Presupuesto Estimado"
                  value={presupuestoEstimado}
                  onChange={handlePresupuestoChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-violeta hover:bg-violoscuro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Actualizar Evento
              </button>
              <button
                className="text-red-600 hover:text-red-800 font-semibold focus:outline-none"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-col lg:flex-row w-full content-center justify-center">
            {event && (
              <div className="w-full lg:w-1/2 bg-white shadow-md rounded px-4 pt-4 pb-4 lg:px-8 lg:pt-6 lg:pb-8">
                <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-bg-[#24203F]">
                  Detalles del Evento
                </h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                      Nombre del Evento
                    </label>
                    <p className="text-gray-900">{event.nombreEvento}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                      Fecha
                    </label>
                    <p className="text-gray-900">{event.fecha}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                      Ubicación
                    </label>
                    <p className="text-gray-900">{event.ubicacion}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                      Descripción
                    </label>
                    <p className="text-gray-900">{event.Detalle}</p>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <div className="mb-4 lg:mb-0 lg:mr-5">
                      <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                        Cantidad de Invitados
                      </label>
                      <p className="text-gray-900">{event.cantInvitados}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-bg-[#24203F] mb-1">
                        Presupuesto Estimado
                      </label>
                      <p className="text-gray-900">
                        $ {event.presupuestoEstimado.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button className="px-4 py-2 bg-violeta text-white font-semibold text-sm rounded-lg shadow-md hover:bg-violoscuro hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
                    <Link href="/eventos">
                      <span>Volver a eventos</span>
                    </Link>
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold focus:outline-none transform hover:scale-105 transition duration-200 ease-in-out"
                    onClick={handleEditar}
                  >
                    <svg
                      className="w-6 h-6 stroke-current"
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
                    <span>Editar Evento</span>
                  </button>
                </div>
              </div>
            )}
            <Checklist params={params} />
          </div>
          {/* Renderizar el componente EventMap solo si la ubicación está definida */}
          {event && event.ubicacion && (
            <div className="w-full mt-8">
              <h2 className="text-2xl font-bold mb-4 text-violeta">Mapa del Evento</h2>
              <EventMap address={event.ubicacion} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default withAuth(EventoDetalles);
