"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import VisualizarEvento from "./VisualizarEvento";
import BotonEliminar from "../eliminar/BotonEliminar";

const TablaEventos = ({ userId, flag = false }) => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      const abortController = new AbortController();
      try {
        if (!userId) {
          setError("Usuario ID no válido");
          setLoading(false);
          return;
        }
        setLoading(true);

        const { data: eventos, error } = await supabase
          .from("evento")
          .select()
          .eq("userID", userId)
          .order("fecha", { ascending: true })
          .abortSignal(abortController.signal);

        if (error) {
          setError(error.message);
        } else {
          if (flag) {
            const ahora = new Date();
            const eventosProximo = eventos.filter(
              (evento) => new Date(evento.fecha) > ahora
            );
            setEventos(eventosProximo.slice(0, 3));
          } else {
            setEventos(eventos);
          }
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("Error al cargar los eventos.");
        }
      } finally {
        setLoading(false);
      }
      return () => abortController.abort();
    };

    fetchEventos();
  }, [userId]);

  const handleDelete = (eventoId) => {
    setEventos(eventos.filter((evento) => evento.id !== eventoId));
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              N°
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Invitados
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Ubicación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
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
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {evento.nombreEvento}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {evento.fecha}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {evento.cantInvitados}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {evento.ubicacion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                {" "}
                ${" "}
                {evento.presupuestoEstimado === null
                  ? 0
                  : evento.presupuestoEstimado.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <BotonEliminar
                    item={evento}
                    tableName="evento"
                    onDelete={handleDelete}
                  />
                  <VisualizarEvento eventoId={evento.id} />
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
