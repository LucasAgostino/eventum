// src/app/confirm/[eventId]/[userId].jsx
"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

const Confirm = () => {
  const { eventoId, userId } = useParams();
  const [message, setMessage] = useState('Confirmando tu asistencia...');
  useEffect(() => {

    const confirmAttendance = async () => {
      if (eventoId && userId) {
        const { data, error } = await supabase
          .from('invitado')
          .update({ estado: "confirmado" })
          .eq('eventoID', eventoId)
          .eq('id', userId);

        if (error) {
          console.error('Error confirming attendance:', error);
          setMessage('Error al confirmar la asistencia.');
        } else {
          setMessage('Asistencia confirmada. ¡Gracias!');
        }
      }
    };

    confirmAttendance();
  }, [eventoId, userId]);

  return <p>{message}</p>;
};

export default Confirm;
