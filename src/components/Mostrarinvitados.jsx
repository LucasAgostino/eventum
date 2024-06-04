"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import PopUpEliminar from '@/components/PopUpEliminar';

const MostrarInvitados = ({ eventoID, filter, searchQuery }) => {
  const [invitados, setInvitados] = useState([]);
  const [filteredInvitados, setFilteredInvitados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedInvitadoId, setSelectedInvitadoId] = useState(null);

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
        .select('id, nombre, apellido, email, estado')
        .eq('eventoID', parseInt(eventoID, 10));

      if (error) {
        setError(error.message);
      } else {
        setInvitados(data);
      }
      setLoading(false);
    };

    fetchInvitados();

    const channel = supabase
      .channel('invitado-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'invitado' }, (payload) => {
        console.log(payload);
        fetchInvitados();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventoID]);

  useEffect(() => {
    let result = invitados;

    if (filter !== 'todos') {
      result = result.filter(invitado => invitado.estado === filter);
    }

    if (searchQuery) {
      result = result.filter(invitado =>
        invitado.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitado.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInvitados(result);
  }, [filter, searchQuery, invitados]);

  const handleDeleteClick = (invitadoId) => {
    setSelectedInvitadoId(invitadoId);
    setShowDeletePopup(true);
  };

  const handleDelete = (invitadoId) => {
    setInvitados(invitados.filter((invitado) => invitado.id !== invitadoId));
  };

  const handleCancel = () => {
    setShowDeletePopup(false);
    setSelectedInvitadoId(null);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      {showDeletePopup && (
        <PopUpEliminar
          invitadoId={selectedInvitadoId}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      <table className="min-w-full divide-y divide-gray-200">
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
                <button 
                  onClick={() => handleDeleteClick(invitado.id)} 
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Eliminar
                </button>
                <button className="text-blue-500 hover:text-blue-700">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarInvitados;
