import React, { useState, useEffect } from 'react';
import Mesa from '@/components/mesas/Mesa';
import DescripcionMesa from '@/components/mesas/DescripcionMesa';

const ListaMesas = ({ mesas, invitados, onAddInvitado, setSelectedMesa }) => {
  const [localSelectedMesa, setLocalSelectedMesa] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMesaClick = (mesa) => {
    setLocalSelectedMesa(mesa);
    setSelectedMesa(mesa); // Llamar a la función pasada como prop
    if (isMobile) {
      setShowPopup(true);
    }
  };

  const handledelete = () => {
    setLocalSelectedMesa(null);
    setSelectedMesa(null); // Llamar a la función pasada como prop
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Set initial value
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-gray-100 p-6 rounded-lg w-full md:w-4/5 min-w-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {mesas.map((mesa, index) => (
            <Mesa
              key={index}
              nombre={mesa.nroMesa}
              capacidad={mesa.capacidad}
              asignados={invitados.filter((invitado) => invitado.mesaId === mesa.id).length}
              onClick={() => handleMesaClick(mesa)}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/3 ml-0 md:ml-4">
        {!isMobile && localSelectedMesa && (
          <DescripcionMesa
            key={localSelectedMesa.id}
            mesa={localSelectedMesa}
            invitadosSinUbicar={invitados.filter((invitado) => invitado.mesaId === null)}
            asignados={invitados.filter((invitado) => invitado.mesaId === localSelectedMesa.id)}
            onAddInvitado={onAddInvitado}
            handledelete={handledelete}
          />
        )}
      </div>
      {isMobile && showPopup && localSelectedMesa && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full mx-4 relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              X
            </button>
            <DescripcionMesa
              key={localSelectedMesa.id}
              mesa={localSelectedMesa}
              invitadosSinUbicar={invitados.filter((invitado) => invitado.mesaId === null)}
              asignados={invitados.filter((invitado) => invitado.mesaId === localSelectedMesa.id)}
              onAddInvitado={onAddInvitado}
              handledelete={handledelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaMesas;
