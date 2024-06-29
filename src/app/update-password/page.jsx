"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage('Error al actualizar la contraseña');
    } else {
      setMessage('Contraseña actualizada correctamente');
      setTimeout(() => {
        router.push('/login');
      }, 3000); // Redirigir después de 3 segundos
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Actualizar contraseña</h1>
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar contraseña
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
