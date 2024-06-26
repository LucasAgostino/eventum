import React, { useState } from 'react';
import Mesa from '@/components/mesas/Mesa';
import DescripcionMesa from '@/components/mesas/DescripcionMesa';

const ListaMesas = ({ mesas, invitados, onAddInvitado }) => {
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [invitadosSinUbicar, setInvitadosSinUbicar] = useState(invitados.filter((invitado) => invitado.mesaId === null));


  return (
    <div className="flex">
      <div className="bg-gray-100 p-6 rounded-lg w-4/5 min-w-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {mesas.map((mesa, index) => (
            <Mesa
              key={index}
              nombre={mesa.nroMesa}
              capacidad={mesa.capacidad}
              asignados = {invitados.filter((invitado) => invitado.mesaId === mesa.id).length}
              onClick={() => setSelectedMesa(mesa)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/3 ml-4">
        {selectedMesa && (
          <DescripcionMesa
            mesa={selectedMesa}
            invitadosSinUbicar={invitadosSinUbicar}
            asignados = {invitados.filter((invitado) => invitado.mesaId === selectedMesa.id)}
            onAddInvitado={onAddInvitado}
          />
        )}
      </div>
    </div>
  );
};

export default ListaMesas;