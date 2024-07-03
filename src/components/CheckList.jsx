import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import BotonEliminar from "./eliminar/BotonEliminar";

function Checklist({ params }) {
  const [checklistItems, setChecklistItems] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchChecklistItems = async () => {
      try {
        const { data, error } = await supabase
          .from("checklist")
          .select("*")
          .eq("id_evento", params.id);

        if (error) {
          console.error("Error fetching checklist items:", error);
        } else {
          setChecklistItems(data);
        }
      } catch (error) {
        console.error("Error fetching checklist items:", error);
      }
    };

    fetchChecklistItems();
  }, [params.id]);

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const { data, error } = await supabase
          .from("checklist")
          .insert([
            {
              id_evento: params.id,
              descripcion: newTask,
            },
          ])
          .select("*"); // Asegúrate de seleccionar todos los campos después de la inserción

        if (error) {
          console.error("Error adding task:", error);
          return;
        }

        const newItem = data[0]; // Usa los datos devueltos por la inserción
        setChecklistItems([...checklistItems, newItem]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const handleDelete = (itemid) => {
    setChecklistItems(
      checklistItems.filter((checklistItem) => checklistItem.id !== itemid)
    );
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    try {
      const { data, error } = await supabase
        .from("checklist")
        .update({ estado: !currentStatus })
        .eq("id", id)
        .select("*");

      if (error) {
        console.error("Error updating task status:", error);
        return;
      }

      setChecklistItems(
        checklistItems.map((item) =>
          item.id === id ? { ...item, estado: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="w-full lg:w-1/3 p-4 lg:p-8 flex items-center justify-center bg-[#24203F] border rounded-md shadow-md">
      <div className="w-full">
        <h1 className="text-center text-2xl lg:text-3xl font-bold mb-4 text-white">
          Checklist
        </h1>
        <h2 className="text-lg font-semibold mb-6 text-white">Tareas</h2>
        <div className="overflow-y-auto max-h-60">
          {" "}
          {/* Contenedor scrollable */}
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex justify-between items-center"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="scale-100 transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-6 h-6"
                  id={`check-item-${item.id}`}
                  checked={item.estado}
                  onChange={() => handleCheckboxChange(item.id, item.estado)}
                />
                <span
                  className={`ml-2 ${
                    item.estado ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {item.descripcion}
                </span>
              </label>
              <div className="mr-6">
                <BotonEliminar
                  item={item}
                  tableName={"checklist"}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          className="w-full px-3 py-2 mb-4 mt-3 text-black rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-violeta hover:bg-violoscuro text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Añadir Tarea
        </button>
      </div>
    </div>
  );
}

export default Checklist;
