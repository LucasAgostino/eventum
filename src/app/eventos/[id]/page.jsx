"use client";
import { supabase } from "@/app/utils/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/app/utils/withAuth";

function EventoDetalles({ params }) {
  const [event, setEvent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nombreEvento, setNombreEvento] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cantInvitados, setcantInvitados] = useState(0);
  const [fecha, setFecha] = useState("");
  const [presupuestoEstimado, setPresupuestoEstimado] = useState(0);

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
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleEditar = () => {
    setEditing(true);
    setNombreEvento(event.nombreEvento);
    setUbicacion(event.ubicacion);
    setcantInvitados(event.cantInvitados);
    setFecha(event.fecha);
    setPresupuestoEstimado(event.presupuestoEstimado);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase
        .from("evento")
        .update({
          nombreEvento,
          ubicacion,
          cantInvitados,
          fecha,
          presupuestoEstimado,
        })
        .eq("id", params.id);

      if (error) {
        throw error;
      }

      console.log("Evento actualizado:", data);
      // Aquí puedes agregar código para manejar la respuesta, como redireccionar al usuario a otra página o mostrar un mensaje de éxito.
    } catch (error) {
      console.error("Error al actualizar el evento:", error.message);
    }
    setEditing(false);
    window.location.reload();
  };

  return (
    <div>
      {editing ? (
        <div className="max-w-md mx-auto bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mt-10">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b-2 border-blue-200 pb-4">
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
                placeholder="Nombre del Evento"
                value={nombreEvento}
                onChange={(e) => setNombreEvento(e.target.value)}
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
                placeholder="Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
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
                placeholder="Cantidad de Invitados"
                value={cantInvitados}
                onChange={(e) => setcantInvitados(e.target.valueAsNumber)}
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
                htmlFor="presupuestoEstimado"
              >
                Presupuesto Estimado:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="presupuestoEstimado"
                type="number"
                placeholder="Presupuesto Estimado"
                value={presupuestoEstimado}
                onChange={(e) => setPresupuestoEstimado(e.target.valueAsNumber)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="mt-8 text-left flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Actualizar Evento
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          {event && (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
              <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b-2 border-blue-200 pb-4">
                Detalles del Evento
              </h1>
              <div className="text-blue-700 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Nombre del Evento:</span>
                  <span>{event.nombreEvento}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Cantidad de Invitados:</span>
                  <span>{event.cantInvitados}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Fecha:</span>
                  <span>{event.fecha}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Presupuesto Estimado:</span>
                  <span>$ {event.presupuestoEstimado}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Ubicación:</span>
                  <span>{event.ubicacion}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <button className="px-4 py-2 bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
                  <Link href="/eventos">
                    <span>Volver a eventos</span>
                  </Link>
                </button>
                <button
                  className="text-left flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                  onClick={handleEditar}
                >
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
                  <span className="font-semibold text-sm text-green-700">
                    Editar Evento
                  </span>
                </button>
                <Link href={`/eventos/${params.id}/invitados`} passHref>
                  <button className="px-4 py-2 bg-green-700 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
                    Cargar Invitados
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default withAuth(EventoDetalles);
