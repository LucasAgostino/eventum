// src/app/confirm/[eventId]/[userId].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

const Confirm = () => {
  const router = useRouter();
  const { eventId, userId } = router.query;
  const [message, setMessage] = useState('Confirmando tu asistencia...');

  useEffect(() => {
    const confirmAttendance = async () => {
      if (eventId && userId) {
        const { data, error } = await supabase
          .from('invitado')
          .update({ estado: "confirmado" })
          .eq('eventoID', eventId)
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
  }, [eventId, userId]);

  return <p>{message}</p>;
};

export default Confirm;
