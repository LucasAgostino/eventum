"use client";
import React, { useState, useEffect } from 'react';
import TabsMesas from '@/components/mesas/TabsMesas'; 


const InvitadosMesa = ({ filter, searchQuery }) => {
  const dataFicticia = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com', estado: 'Ubicado' },
    { id: 2, nombre: 'Ana', apellido: 'García', email: 'ana.garcia@example.com', estado: 'Falta Ubicar' },
    { id: 3, nombre: 'Luis', apellido: 'Martínez', email: 'luis.martinez@example.com', estado: 'Ubicado' },
    { id: 4, nombre: 'María', apellido: 'Rodríguez', email: 'maria.rodriguez@example.com', estado: 'Falta Ubicar' },
    // Agrega más invitados ficticios si es necesario
  ];

  const [invitados, setInvitados] = useState(dataFicticia);
  const [filteredInvitados, setFilteredInvitados] = useState(dataFicticia);
  const [activeTab, setActiveTab] = useState('todos');

  useEffect(() => {
    let result = invitados;

    if (filter !== 'todos') {
      result = result.filter(invitado => invitado.estado.toLowerCase() === activeTab);    }

    if (searchQuery) {
      result = result.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInvitados(result);
  }, [activeTab, searchQuery, invitados]);

  return (
    <div className="overflow-x-auto p-1">
      <TabsMesas activeTab ={activeTab} onTabChange= {setActiveTab}/>
      <table className="min-w-full divide-y border divide-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInvitados.map((invitado, index) => (
            <tr key={invitado.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.apellido}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{invitado.estado}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {invitado.estado === 'Ubicado' ? (
                  <button className="bg-[#576CA8] text-white px-3 py-1 rounded ">Ver mesa</button>
                ) : (
                  <button className="bg-[#576CA8] text-white px-3 py-1 rounded">Ver disponibilidad</button>
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