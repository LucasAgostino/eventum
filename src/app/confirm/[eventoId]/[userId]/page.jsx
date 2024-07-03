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
        setMessage(response === 'confirmado' ? "¡Gracias por aceptar la invitación! Estamos emocionados de verte allí." : "Lamentamos que no puedas acompañarnos. ¡Esperamos verte en la próxima ocasión! 😔");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D244D] to-[#0F172A] text-white overflow-hidden relative flex items-center justify-center">
      <div className="container mx-auto text-center justify-center py-20 px-20 lg:px-8">
        <div className="flex flex-col items-center">
          <img
            src="/Logo_Eventum_Title.png"
            alt="Event Image"
            className="mb-6"
          />
          <div className="bg-[#2A448D] bg-opacity-80 border border-[#596BA5] rounded-xl shadow-lg animate-fadeIn flex items-center justify-center" style={{ height: 400, width: 800 }}>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8 ">{message}</h1>
              {message === 'Por favor, confirma tu asistencia.' && (
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => handleResponse('confirmado')}
                    className="bg-green-600 bg-opacity-90 text-white border border-green-800 py-3 px-10 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleResponse('rechazado')}
                    className="bg-red-600 bg-opacity-90 border border-red-800 text-white py-3 px-10 rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="particle absolute w-2 h-2 bg-white opacity-50 rounded-full animate-move"
        style={{ top: '20%', left: '10%', animationDelay: '0.5s' }}
      ></div>
      <div
        className="particle absolute w-2 h-2 bg-white opacity-50 rounded-full animate-move"
        style={{ top: '40%', left: '80%', animationDelay: '1s' }}
      ></div>
      <div
        className="particle absolute w-2 h-2 bg-white opacity-50 rounded-full animate-move"
        style={{ top: '60%', left: '30%', animationDelay: '1.5s' }}
      ></div>
      <div
        className="particle absolute w-2 h-2 bg-white opacity-50 rounded-full animate-move"
        style={{ top: '80%', left: '70%', animationDelay: '2s' }}
      ></div>
    </div>
  );
  
};

export default Confirm;