"use client"
import React, { useState, useEffect } from 'react';
import { IconTrash, IconPlus} from "@tabler/icons-react";
import PopupAgregarInvitado from '@/components/mesas/PopupAgregarInvitado';

const DescripcionMesa = ({ mesa, invitadosSinUbicar = [], onAddInvitado }) => {
  const [editMode, setEditMode] = useState(false);
  const [invitados, setInvitados] = useState(mesa ? mesa.invitados : []);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (mesa) {
      setInvitados(mesa.invitados);
    }
  }, [mesa]);

  const handleAddInvitado = (invitado) => {
    setInvitados([...invitados, invitado]);
    onAddInvitado(invitado);
    setShowPopup(false);
  };

  const handleRemoveInvitado = (index) => {
    const newInvitados = invitados.slice();
    newInvitados.splice(index, 1);
    setInvitados(newInvitados);
  };

  const handleInputChange = (index, value) => {
    const newInvitados = invitados.slice();
    newInvitados[index].nombre = value;
    setInvitados(newInvitados);
  };

  const casilleros = Array.from({ length: mesa.capacidad }, (_, index) => (
    invitados[index] ? (
      <li key={index} className="flex items-center p-2 bg-[#576CA8] text-white mb-2 rounded">
        {editMode ? (
          <>
            <input
              type="text"
              value={invitados[index].nombre}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="bg-transparent border-none text-white w-full"
            />
            <button onClick={() => handleRemoveInvitado(index)} className="ml-2">
              <IconTrash />
            </button>
          </>
        ) : (
          <span>{invitados[index].nombre}</span>
        )}
      </li>
    ) : (
      <li key={index} className="p-2 bg-gray-200 text-gray-600 mb-2 rounded border-2 flex items-center">
        {editMode ? (
          <>
            <button onClick={() => setShowPopup(true)} className="flex items-center">
              <IconPlus className="mr-2" />
              <span>Agrega un nuevo invitado</span>
            </button>
          </>
        ) : (
          <span>Vacío</span>
        )}
      </li>
    )
  ));

  return (
    <div className="bg-white p-4 rounded shadow-md w-80">
      <div className='h-20 bg-[#1B264F] content-center text-center'>
        <p className='text-white text-xl'>Nombre de los invitados</p>
      </div>
      <h2 className="text-xl mt-4">Mesa: {mesa.nombre}</h2>
      <p className='text-sm'>{invitados.length}/{mesa.capacidad}</p>
      <ul className='mt-4'>
        {casilleros}
      </ul>
      {editMode ? (
        <button onClick={() => setEditMode(false)} className="bg-[#1B264F] text-white rounded mt-4 justify-center content-center h-8 w-40">Guardar cambios</button>
      ) : (
        <button onClick={() => setEditMode(true)} className="bg-[#1B264F] text-white rounded mt-4 justify-center content-center h-8 w-40">Editar Mesa</button>
      )}
      {showPopup && (
        <PopupAgregarInvitado
          invitadosSinUbicar={invitadosSinUbicar}
          onAddInvitado={handleAddInvitado}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default DescripcionMesa;
