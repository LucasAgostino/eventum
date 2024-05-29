// InvitadosTabla.js
"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';

const Mostrarinvitados = ({ eventoID }) => {
  const [invitados, setInvitados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitados = async () => {
      if (!eventoID) {
        setError('Evento ID no válido');
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('invitado')
        .select('nombre, apellido, email')
        .eq('eventoID', parseInt(eventoID, 10));
        
      if (error) {
        setError(error.message);
      } else {
        setInvitados(data);
      }
      setLoading(false);
    };

    fetchInvitados();
  }, [eventoID]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {invitados.map((invitado) => (
      <tr key={invitado.email} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{invitado.nombre}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invitado.apellido}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invitado.email}</td>
      </tr>
    ))}
  </tbody>
</table>
  );
};
export default Mostrarinvitados;