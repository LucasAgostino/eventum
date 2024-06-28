"use client";
import React, { useState, useEffect } from 'react';
import TabsMesas from '@/components/mesas/TabsMesas';
import { supabase } from "@/utils/supabase"; // Ajusta la ruta según tu estructura
import { data } from 'autoprefixer';

const InvitadosMesa = ({ filter, searchQuery, invitados}) => {
  const [filteredInvitados, setFilteredInvitados] = useState(invitados);
  const [activeTab, setActiveTab] = useState('todos');
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const fetchMesas = async () => {
      const { data, error } = await supabase
        .from('mesa')
        .select('id, nroMesa');

      if (error) {
        console.error('Error fetching mesas:', error);
      } else {
        setMesas(data);
      }
    };

    fetchMesas();
  }, [mesas]);

  useEffect(() => {
    let result = invitados;

    if (filter !== 'todos') {
      result = result.filter(invitado => invitado.estado.toLowerCase() === activeTab);
    }

    if (searchQuery) {
      result = result.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.apellido.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInvitados(result);
  }, [activeTab, searchQuery, invitados, filter]);

  const getNroMesa = (mesaId) => {
    const mesa = mesas.find(m => m.id === mesaId);
    return mesa ? mesa.nroMesa : '';
  };

  return (
    <div className="overflow-x-auto p-1">
      <TabsMesas activeTab={activeTab} onTabChange={setActiveTab} />
      <table className="min-w-full divide-y border divide-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Mesa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInvitados.map((invitado, index) => (
            <tr key={invitado.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap">{getNroMesa(invitado.mesaId)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {invitado.mesaId === null ? (
                  <span>No ubicado</span>
                ) : (
                  <span>Ubicado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitadosMesa;
