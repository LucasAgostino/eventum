"use client";
import React, { useState, useEffect } from 'react';
import TabsMesas from '@/components/mesas/TabsMesas';

const InvitadosMesa = ({ filter, searchQuery, invitados, mesas }) => {
  const [filteredInvitados, setFilteredInvitados] = useState(invitados);
  const [activeTab, setActiveTab] = useState('todos');

  useEffect(() => {
    let result = invitados;

    if (activeTab !== 'todos') {
      if (activeTab === 'ubicados') {
        result = result.filter(invitado => invitado.mesaId !== null);
      } else if (activeTab === 'no_ubicados') {
        result = result.filter(invitado => invitado.mesaId === null);
      }
    }

    if (searchQuery) {
      result = result.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.apellido.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInvitados(result);
  }, [activeTab, searchQuery, invitados]);

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
