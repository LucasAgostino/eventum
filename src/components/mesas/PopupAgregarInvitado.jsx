import React from 'react';

const PopupAgregarInvitado = ({ invitadosSinUbicar = [], onAddInvitado, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Agrega un nuevo invitado</h2>
        <ul className="max-h-60 overflow-y-auto">
          {invitadosSinUbicar.map((invitado, index) => (
            <li key={index} className="flex justify-between p-2 border-b border-gray-200">
              <span>{invitado.nombre} {invitado.apellido}</span>
              <button
                onClick={() => onAddInvitado(invitado)}
                className="bg-violeta text-white px-2 py-1 rounded"
              >
                Agregar
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Cerrar</button>
      </div>
    </div>
  );
};

export default PopupAgregarInvitado;