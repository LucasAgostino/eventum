"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import PopUpEliminar from "@/components/PopUpEliminar";
import EliminarEvento from "./EliminarEvento";
import VisualizarEvento from "./VisualizarEvento";

const TablaEventos = ({ userId}) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEventoId, setSelectedEventoId] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      if (!userId) {
        setError("Usuario ID no válido");
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: eventos, error } = await supabase
        .from("evento")
        .select()
        .eq("userID", userId);

      if (error) {
        setError(error.message);
      } else {
        setEventos(eventos);
      }
      setLoading(false);
    };

    fetchEventos();
  }, [userId]);

  const handleDelete = (eventoId) => {
    setEventos(eventos.filter((evento) => evento.id !== eventoId));
  };


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              N°
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad de invitados
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ubicacion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Presupuesto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {eventos.map((evento, index) => (
            <tr key={evento.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {evento.nombreEvento}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {evento.cantInvitados}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{evento.fecha}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {evento.ubicacion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {evento.presupuestoEstimado}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex">
                  <EliminarEvento evento={evento} onDelete={handleDelete} />
                  <VisualizarEvento eventoId={evento.id}> </VisualizarEvento>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEventos;
