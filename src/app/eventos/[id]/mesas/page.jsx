"use client"
import React, { useState } from 'react';
import ListaMesas from '@/components/mesas/ListaMesas';
import InvitadosMesa from '@/components/mesas/InvitadosMesa';
import FiltroMesas from '@/components/mesas/FiltroMesas';


const initialMesas = [
  { id: 1, nombre: 'Mesa 1', capacidad: 6, invitados: [{ nombre: 'Ivan Daza' }, { nombre: 'Lucas Agostino' }] },
  { id: 2, nombre: 'Mesa 2', capacidad: 6, invitados: [{ nombre: 'Carlos Pérez' }] },
  { id: 3, nombre: 'Mesa 3', capacidad: 6, invitados: [{ nombre: 'Ana Gómez' }, { nombre: 'Marta López' }, { nombre: 'Juan Díaz' }, { nombre: 'Sofia Martínez' }, { nombre: 'Pedro Ramírez' }, { nombre: 'Laura Jiménez' }] },
  // Agrega más mesas según sea necesario
];

const filtrosDisponibles = [4, 6, 8];

const initialInvitadosSinUbicar = [
    { nombre: 'Eventum' },
    { nombre: 'Software' }
  ];

const HomePage = () => {
  const [filtro, setFiltro] = useState(6);
  const [mesas, setMesas] = useState(initialMesas);
  const [invitadosSinUbicar, setInvitadosSinUbicar] = useState(initialInvitadosSinUbicar);
  const [selectedMesa, setSelectedMesa] = useState(null);

  const mesasFiltradas = mesas.filter((mesa) => mesa.capacidad === filtro);

  const handleAddInvitado = (invitado) => {
    setInvitadosSinUbicar(invitadosSinUbicar.filter(i => i.nombre !== invitado.nombre));
    setMesas(mesas.map(mesa => {
      if (mesa.id === selectedMesa.id) {
        return {
          ...mesa,
          invitados: [...mesa.invitados, invitado]
        };
      }
      return mesa;
    }));
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <FiltroMesas filtros={filtrosDisponibles} filtroActual={filtro} setFiltro={setFiltro} />
        <button className="bg-[#274690] text-white px-4 py-3 rounded">Agregar mesa</button>
      </div>
      <ListaMesas
        mesas={mesasFiltradas}
        invitadosSinUbicar={invitadosSinUbicar}
        onAddInvitado={handleAddInvitado}
      />

      
      <div className="mt-4">
        <InvitadosMesa filter="todos" searchQuery="" />
      </div>
    </div>
  );
};

export default HomePage;