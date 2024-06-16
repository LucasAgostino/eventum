import React, { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import PopUpEliminar from "./PopUpEliminar";



const BotonEliminar = ({ item, tableName, onDelete }) => {
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const confirmarEliminacion = () => {
    setItemIdToDelete(item.id);
  };

  const cancelarEliminacion = () => {
    setItemIdToDelete(null);
  };

  const handleDelete = () => {
    onDelete(item.id);
    setItemIdToDelete(null);
  };

  return (
    <div>
      {itemIdToDelete && (
        <PopUpEliminar
          itemId={itemIdToDelete}
          tableName={tableName}
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

export default BotonEliminar;
