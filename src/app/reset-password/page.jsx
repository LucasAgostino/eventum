"use client";
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/update-password', // Asegúrate de actualizar esta URL para producción
    });
    if (error) {
      setMessage('Error al enviar el mail');
    } else {
      setMessage('Mail de recupero enviado correctamente');
    }
  };

  const handleRedirect = () => {
    router.push('/login'); // Reemplaza '/login' con la ruta a la que deseas redirigir
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Recuperar contraseña</h1>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="usuario@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Recuperar contraseña
          </button>
          <button
            type="button"
            className="w-full text-black py-2 px-4"
            onClick={handleRedirect}
          >
            Volver a inicio de sesión
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
