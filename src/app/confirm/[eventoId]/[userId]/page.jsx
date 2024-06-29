"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Head from 'next/head';

const Confirm = () => {
  const { eventoId, userId } = useParams();
  const [message, setMessage] = useState('Por favor, confirma tu asistencia.');

  const handleResponse = async (response) => {
    if (eventoId && userId) {
      let updates = { estado: response };
      if (response === 'rechazado') {
        updates.mesaId = null;
      }

      const { data, error } = await supabase
        .from('invitado')
        .update(updates)
        .eq('eventoID', eventoId)
        .eq('id', userId);

      if (error) {
        console.error('Error updating attendance:', error);
        setMessage('Error al actualizar la asistencia.');
      } else {
        setMessage(response === 'confirmado' ? '¡Gracias por aceptar la invitación!' : 'Lamentamos que no puedas asistir.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f29] text-white overflow-hidden relative">
      <Head>
        <title>Eventum - Confirmación</title>
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
          <h1 className="text-4xl my-5">{message}</h1>
          {message === 'Por favor, confirma tu asistencia.' && (
            <div className="flex justify-center space-x-4 my-5">
              <button
                onClick={() => handleResponse('confirmado')}
                className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleResponse('rechazado')}
                className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                Rechazar
              </button>
            </div>
          )}
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
