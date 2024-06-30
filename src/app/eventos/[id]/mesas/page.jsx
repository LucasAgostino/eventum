"use client";
import React, { useEffect, useState } from "react";
import ListaMesas from "@/components/mesas/ListaMesas";
import InvitadosMesa from "@/components/mesas/InvitadosMesa";
import FiltroMesas from "@/components/mesas/FiltroMesas";
import { supabase } from "@/utils/supabase";
import withAuth from "@/utils/withAuth";

const filtrosDisponibles = [4, 6, 8];

const MesasPage = ({ params }) => {
  const [invitados, setInvitados] = useState([]);
  const [invitadosSinUbicar, setInvitadosSinUbicar] = useState([]);
  const [filtro, setFiltro] = useState('Todas');
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newMesa, setNewMesa] = useState({ nroMesa: "", capacidad: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch invitados
        const { data: invitadosData, error: invitadosError } = await supabase
          .from("invitado")
          .select("id, nombre, apellido, mesaId, estado")
          .eq("eventoID", params.id)
          .neq("estado", "rechazado");

        if (invitadosError) {
          throw invitadosError;
        } else {
          setInvitados(invitadosData);
          setInvitadosSinUbicar(invitadosData.filter(inv => !inv.mesaId));
        }
        // Fetch mesas
        const { data: mesasData, error: mesasError } = await supabase
          .from("mesa")
          .select("id, nroMesa, capacidad")
          .eq("eventoId", params.id);

        if (mesasError) {
          throw mesasError;
        } else {
          setMesas(mesasData);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    if (params.id) {
      fetchData();

      // Suscripción a cambios en la tabla 'invitado'
      const invitadosChannel = supabase
        .channel('invitados-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'invitado' }, payload => {
          console.log('Cambio en la tabla invitado:', payload);
          fetchData(); // Vuelve a llamar a fetchData cuando hay un cambio
        })
        .subscribe();

      // Suscripción a cambios en la tabla 'mesa'
      const mesasChannel = supabase
        .channel('mesas-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mesa' }, payload => {
          console.log('Cambio en la tabla mesa:', payload);
          fetchData(); // Vuelve a llamar a fetchData cuando hay un cambio
        })
        .subscribe();

      // Cleanup las suscripciones cuando el componente se desmonte
      return () => {
        supabase.removeChannel(invitadosChannel);
        supabase.removeChannel(mesasChannel);
      };
    }
  }, [params.id]);

  const agregarMesa = async (e) => {
    e.preventDefault();
    const { nroMesa, capacidad } = newMesa;
    const { data, error } = await supabase.from("mesa").insert([{ eventoId: params.id, nroMesa, capacidad }]).select();
    if (error) {
      setError(error.message);
    } else {
      setMesas([...mesas, data[0]]);
      setShowModal(false);
      setNewMesa({ nroMesa: "", capacidad: "" });
    }
  };

  const mesasFiltradas = filtro === 'Todas' ? mesas : mesas.filter((mesa) => mesa.capacidad === filtro);

  const handleAddInvitado = (invitado) => {
    setInvitadosSinUbicar(
      invitadosSinUbicar.filter((i) => i.nombre !== invitado.nombre)
    );
    setMesas(
      mesas.map((mesa) => {
        if (mesa.id === selectedMesa.id) {
          return {
            ...mesa,
            invitados: [...mesa.invitados || [], invitado],
          };
        }
        return mesa;
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      {error && <div>Error: {error}</div>}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <FiltroMesas
          filtros={filtrosDisponibles}
          filtroActual={filtro}
          setFiltro={setFiltro}
        />
        <button onClick={() => setShowModal(true)} className="bg-violeta text-white px-4 py-3 rounded mt-4 md:mt-0">
          Agregar mesa
        </button>
      </div>
      
      <ListaMesas
        mesas={mesasFiltradas}
        invitados={invitados}
        onAddInvitado={handleAddInvitado}
        setSelectedMesa={setSelectedMesa}
        setMesas={setMesas}
      />

      <div className="mt-4">
        <InvitadosMesa filter="todos" searchQuery="" invitados={invitados} mesas={mesas} />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl mb-4">Agregar Nueva Mesa</h2>
            <form onSubmit={agregarMesa}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Número de Mesa</label>
                <input
                  type="text"
                  value={newMesa.nroMesa}
                  onChange={(e) => setNewMesa({ ...newMesa, nroMesa: e.target.value })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                  placeholder="N°"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Capacidad</label>
                <input
                  type="number"
                  value={newMesa.capacidad}
                  onChange={(e) => setNewMesa({ ...newMesa, capacidad: parseInt(e.target.value) })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  min="1"
                  required
                  placeholder="4"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="mr-4 px-4 py-2 border border-gray-300 rounded">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-violeta text-white rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(MesasPage);
