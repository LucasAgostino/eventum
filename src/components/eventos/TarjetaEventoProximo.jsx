import React, { useEffect, useState } from 'react';
import { supabase } from "@/utils/supabase";
import { useUserSession } from "@/context/UserSessionContext";

const TarjetaEventoProximo = () => {
    const [proximoEvento, setProximoEvento] = useState(null);
    const [invitacionEnviada, setInvitacionEnviada] = useState(false);
    const [cantidadInvitados, setCantidadInvitados] = useState(0);
    const { user } = useUserSession();
  
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
            fetchInvitados(eventoProximo.id);
          }
        }
      }

      async function fetchInvitados(eventoId) {
        const { data: invitados, error } = await supabase
          .from("invitado")
          .select()
          .eq("eventoID", eventoId);

        if (error) {
          console.error("Error fetching invitados:", error.message);
        } else {
          const invitacionEnviada = invitados.some(invitado =>
            ['enviado', 'confirmado', 'rechazado'].includes(invitado.estado)
          );
          setInvitacionEnviada(invitacionEnviada);
          setCantidadInvitados(invitados.length);
        }
      }

      if (user) {
        fetchEventos();
      }
    }, [user]);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div className="bg-white border border-gray-300 shadow-lg p-4 max-h-full rounded-lg mr-4 mb-4 sm:ml-4 w-full max-w-lg">
        <h1 className="text-xl font-bold mb-2">Próximo evento</h1>
        {proximoEvento ? (
          <div className="flex items-center mb-4">
            <div>
              <h2 className="text-3xl font-semibold mb-2">
                <strong>{proximoEvento.nombreEvento}</strong>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                <strong> Fecha: </strong>
                {formatDate(proximoEvento.fecha)}
              </p>
              <p className="text-gray-600 text-sm">
                📍{proximoEvento.ubicacion || "Ubicación no especificada"}
              </p>
            </div>
          </div>
        ) : (
          <p>No hay eventos próximos.</p>
        )}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
            <p className="text-2xl text-black mb-2 sm:mb-0">
              <strong>Estado de invitaciones</strong>
            </p>
            <div className="sm:ml-4">
              <p className="text-sm text-gray-600 bg-gray-200 p-2 rounded-sm">
                {invitacionEnviada ? "🟢 Enviadas" : "⚪ No enviadas"}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-3">
            <div className="inline-block bg-gray-200 p-2 rounded-sm">
              <strong>{cantidadInvitados}/{proximoEvento?.cantInvitados || 0}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TarjetaEventoProximo;
