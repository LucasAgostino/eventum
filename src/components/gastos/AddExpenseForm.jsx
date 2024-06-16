// components/AddExpenseForm.js
import { supabase } from "@/utils/supabase";
import { useState } from "react";

export default function AddExpenseForm({eventoId}) {
  const [formData, setFormData] = useState({
    descripcion: "",
    eventoId: eventoId,
    categoria: "",
    importe: 0.0, // Usamos el eventoID pasado como prop
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("gasto").insert([
      {
        descripcion: formData.descripcion,
        eventoId: eventoId,
        importe: formData.importe,
        categoria: formData.categoria,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      // Opcional: Reiniciar el formulario después de la inserción exitosa
      setFormData({
        descripcion: "",
        eventoId: "",
        categoria: "",
        importe: 0.0,
        eventoId: eventoId,
      });
      
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold">Agregar gasto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="block text-gray-700 font-bold mb-2"
          >
            Descripcion del gasto:
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="importe"
            className="block text-gray-700 font-bold mb-2"
          >
            Importe:
          </label>
          <input
            type="number"
            id="importe"
            name="importe"
            value={formData.importe}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Categoria:
          </label>
          <select
            id="categoria"
            name="categoria"
            className="w-full p-2 border rounded"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Venue">Venue</option>
            <option value="Food">Food</option>
            <option value="Decor">Decor</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
