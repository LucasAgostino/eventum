import React from 'react';
import { IconTrash } from "@tabler/icons-react";
import { supabase } from "@/utils/supabase";

function PopUpEliminar({ itemId, tableName, onCancel, onDelete }) {
  
  const handleDelete = async () => {
    const { error } = await supabase.from(tableName).delete().eq("id", itemId);
    if (error) {
      console.error(`Error deleting from ${tableName}:`, error.message);
    } else {
      onDelete(itemId); // Llama a onDelete para actualizar la lista de items en el componente padre
    }
    onCancel(); // Cierra el popup después de eliminar
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-gray-800 px-4 py-5 sm:px-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <IconTrash size={20} />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Eliminar item
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    ¿Estás seguro de que deseas eliminar este {tableName}?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse">
            <button
              onClick={handleDelete}
              type="button"
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-sm mb-2 sm:mb-0"
            >
              Sí, eliminar
            </button>
            <button
              onClick={onCancel}
              type="button"
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpEliminar;
