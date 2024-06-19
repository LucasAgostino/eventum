"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/utils/withAuth";

const initialChecklistItems = [
];

function EventoDetalles({ params }) {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nombreEvento, setNombreEvento] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [cantInvitados, setcantInvitados] = useState(0);
  const [fecha, setFecha] = useState("");
  const [presupuestoEstimado, setPresupuestoEstimado] = useState(0);
  const [checklistItems, setChecklistItems] = useState(initialChecklistItems);
  const [newTask, setNewTask] = useState('');


  const handleAddTask = () => {
    if (newTask.trim() === '') return; // No añadir tareas vacías

    const newTaskItem = { id: checklistItems.length + 1, label: newTask };
    setChecklistItems([...checklistItems, newTaskItem]);
    setNewTask(''); // Limpiar el campo de entrada
  };
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
  }, [params.id, event]);

  const handleEditar = () => {
    setEditing(true);
    setNombreEvento(event.nombreEvento);
    setUbicacion(event.ubicacion);
    setcantInvitados(event.cantInvitados);
    setFecha(event.fecha);
    setPresupuestoEstimado(event.presupuestoEstimado);
    setDescripcion(evernt.descripcion9);
  };

  const handleCancelar = () => {
    setEditing(false);
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
    //window.location.reload();
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gray-50 p-8 ">
      {editing ? (
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
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
                placeholder="Ubicación"
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
              
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
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
              <div className="w-1/2 pl-2">
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
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Actualizar Evento
              </button>
              <button
                className="text-gray-600 hover:text-gray-800 font-semibold focus:outline-none"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full content-center justify-center ">
          {event && (
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
              <h1 className="text-3xl font-bold mb-6 text-blue-600">
                Detalles del Evento
              </h1>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-700 mb-1">
                    Nombre del Evento
                  </label>
                  <p className="text-gray-900">{event.nombreEvento}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-700 mb-1">
                    Fecha
                  </label>
                  <p className="text-gray-900">{event.fecha}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-700 mb-1">
                    Ubicación
                  </label>
                  <p className="text-gray-900">{event.ubicacion}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-700 mb-1">
                    Descripción
                  </label>
                  <p>Aca iria una descripcion del evento</p>
                    
                  <p className="text-gray-900">{event.descripcion}</p>
                </div>
                <div className="flex "> 
                  <div>
                    <label className="block text-sm font-bold text-blue-700 mb-1 mr-5">
                      Cantidad de Invitados
                    </label>
                    <p className="text-gray-900">{event.cantInvitados}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-blue-700 mb-1">
                      Presupuesto Estimado
                    </label>
                    <p className="text-gray-900">$ {event.presupuestoEstimado}</p>
                  </div>
                </div> 
              </div>
              <div className="flex items-center justify-between mt-8">
                <button className="px-4 py-2 bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
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
          <div className="w-full lg:w-1/3 p-8 flex items-center justify-center bg-[#24203F] border rounded-md shadow-md">
            <div className="w-full">
              <h1 className="text-center text-3xl font-bold mb-4 text-white">Checklist</h1>
              <h2 className="text-lg font-semibold mb-6 bt-10 text-white">Tareas</h2>
              {checklistItems.map(item => (
                <div key={item.id} className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="scale-100 transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-6 h-6"
                      id={`check-item-${item.id}`}
                    />
                    <span className="ml-2 text-white">{item.label}</span>
                  </label>
                </div>
              ))}
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nueva tarea"
                className="w-full px-3 py-2 mb-4 text-black rounded"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Añadir Tarea
              </button>
            </div>
            
          </div>

          

        </div>
        
      )}
    </div>
  );
}

export default withAuth(EventoDetalles);
