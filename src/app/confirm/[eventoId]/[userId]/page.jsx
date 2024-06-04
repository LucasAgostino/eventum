// src/app/confirm/[eventId]/[userId].jsx
"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Head from 'next/head';

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
        } 
      }
    };

    confirmAttendance();
  }, [eventoId, userId]);

  return (
    <div className="min-h-screen bg-[#0c0f29] text-white overflow-hidden relative">
      <Head>
        <title>Eventum - Gracias</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideDown {
            from { top: -100px; }
            to { top: 0; }
          }

          @keyframes zoomIn {
            from { transform: scale(0.5); }
            to { transform: scale(1); }
          }

          @keyframes move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100vw, 100vh); }
          }

          .animate-fadeIn {
            animation: fadeIn 2s ease-in-out;
          }

          .animate-slideDown {
            animation: slideDown 1s ease-in-out;
          }

          .animate-zoomIn {
            animation: zoomIn 1s ease-in-out;
          }

          .animate-move {
            animation: move 10s infinite ease-in-out;
          }
        `}</style>
      </Head>
      
      <div className="container mx-auto text-center py-20 mt-24 animate-fadeIn">
        <div className="content animate-zoomIn">
          <img src="/Logo_Eventum_Title.png" alt="Event Image" className="w-full max-w-lg mx-auto rounded-md" />
          <h1 className="text-4xl my-5">¡Gracias por aceptar la invitación!</h1>
          <p className="text-xl my-2">Estamos emocionados de que te unas a nosotros para este evento especial. Tu presencia hará que la ocasión sea aún más memorable.</p>
          <a href="path/to/your/file.pdf" className="inline-block bg-green-600 text-white py-3 px-6 rounded-md my-5 hover:bg-green-700 transition-colors">Descargar detalles del evento</a>
        </div>
        <footer className="mt-12 py-5 bg-[#1b1f40] text-center animate-fadeIn">
          <p className="text-gray-400">Conéctate con nosotros en las redes sociales</p>
          <a href="https://www.instagram.com" className="text-green-500 mx-2">Instagram</a>
          <a href="https://www.facebook.com" className="text-green-500 mx-2">Facebook</a>
          <a href="https://www.twitter.com" className="text-green-500 mx-2">Twitter</a>
          <a href="https://www.whatsapp.com" className="text-green-500 mx-2">WhatsApp</a>
        </footer>
      </div>
      <div className="particle absolute w-1 h-1 bg-white opacity-50 rounded-full top-[20%] left-[10%] animate-move" style={{ animationDelay: '0.5s' }}></div>
      <div className="particle absolute w-1 h-1 bg-white opacity-50 rounded-full top-[40%] left-[80%] animate-move" style={{ animationDelay: '1s' }}></div>
      <div className="particle absolute w-1 h-1 bg-white opacity-50 rounded-full top-[60%] left-[30%] animate-move" style={{ animationDelay: '1.5s' }}></div>
      <div className="particle absolute w-1 h-1 bg-white opacity-50 rounded-full top-[80%] left-[70%] animate-move" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default Confirm;
