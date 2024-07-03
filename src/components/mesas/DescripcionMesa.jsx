"use client";
import React, { useState, useEffect } from 'react';
import { IconTrash, IconPlus } from "@tabler/icons-react";
import PopupAgregarInvitado from '@/components/mesas/PopupAgregarInvitado';
import { supabase } from "@/utils/supabase";
import BotonEliminar from '../eliminar/BotonEliminar';

const DescripcionMesa = ({ mesa, invitadosSinUbicar = [], asignados, onAddInvitado, handledelete }) => {
  const [invitados, setInvitados] = useState(asignados);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInvitados(asignados);
  }, [asignados]);

  const handleAddInvitado = async (invitado) => {
    setInvitados([...invitados, invitado]);
    onAddInvitado(invitado);
    try {
      const { error } = await supabase
        .from('invitado')
        .update({ mesaId: mesa.id })
        .eq('id', invitado.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
      console.error('Error al agregar invitado: ', error);
    }
    setShowPopup(false);
  };

  const handleRemoveInvitado = async (index) => {
    const newInvitados = invitados.slice();
    const removedInvitado = newInvitados.splice(index, 1)[0];
    setInvitados(newInvitados);

    try {
      const { error } = await supabase
        .from('invitado')
        .update({ mesaId: null })
        .eq('id', removedInvitado.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
      console.error('Error al eliminar invitado: ', error);
    }
  };

  const handleInputChange = (index, value) => {
    const newInvitados = invitados.slice();
    const [nombre, apellido] = value.split(' ');
    newInvitados[index].nombre = nombre;
    newInvitados[index].apellido = apellido;
    setInvitados(newInvitados);
  };

  const casilleros = Array.from({ length: mesa.capacidad }, (_, index) => (
    invitados[index] ? (
      <li key={index} className="flex items-center p-2 bg-[#1B264F] text-white mb-2 rounded">
        <input
          type="text"
          value={`${invitados[index].nombre} ${invitados[index].apellido}`}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="bg-transparent border-none text-white w-full"
        />
        <button onClick={() => handleRemoveInvitado(index)} className="ml-2">
          <IconTrash />
        </button>
      </li>
    ) : (
      <li key={index} className="p-2 bg-gray-200 text-gray-600 mb-2 rounded border-2 flex items-center">
        <button onClick={() => setShowPopup(true)} className="flex items-center">
          <IconPlus className="mr-2" />
          <span>Agrega un nuevo invitado</span>
        </button>
      </li>
    )
  ));

  const handleDelete = () => {
    handledelete();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-80">
      <div className='h-20 bg-[#1B264F] content-center text-center'>
        <p className='text-white text-xl'>Nombre de los invitados</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl">Mesa: {mesa.nroMesa}</h2>
        <BotonEliminar item={mesa} tableName="mesa" onDelete={handleDelete}/>
      </div>
      <p className='text-sm'>{invitados.length}/{mesa.capacidad}</p>
      <ul className={`mt-4 ${casilleros.length > 9 ? 'max-h-96 overflow-y-auto' : ''}`}>
        {casilleros}
      </ul>
      {showPopup && (
        <PopupAgregarInvitado
          key={invitadosSinUbicar.length} // Usar la longitud de la lista como key para forzar el remount
          invitadosSinUbicar={invitadosSinUbicar}
          onAddInvitado={handleAddInvitado}
          onClose={() => setShowPopup(false)}
        />
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default DescripcionMesa;
