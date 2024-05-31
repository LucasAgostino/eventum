import React, { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import PopUpEliminar from "@/components/PopUpEliminar";

const EliminarEvento = ({ evento, onDelete }) => {
  const [eventoIdToDelete, setEventoIdToDelete] = useState(null);

  const confirmarEliminacion = () => {
    setEventoIdToDelete(evento.id);
  };

  const cancelarEliminacion = () => {
    setEventoIdToDelete(null);
  };

  const handleDelete = () => {
    onDelete(evento.id);
    setEventoIdToDelete(null);
  };

  return (
    <div>
      {eventoIdToDelete && (
        <PopUpEliminar
          eventoId={eventoIdToDelete}
          onCancel={cancelarEliminacion}
          onDelete={handleDelete}
        />
      )}
      <button
        onClick={confirmarEliminacion}
        className="text-red-600 hover:text-red-900"
      >
        <IconTrash size={25} />
      </button>
    </div>
  );
};

export default EliminarEvento;