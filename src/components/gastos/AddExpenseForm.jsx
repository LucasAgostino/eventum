import { useState } from "react";

export default function AddExpenseForm({ addExpense }) {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      descripcion,
      importe: parseFloat(importe),
      categoria,
    };
    await addExpense(newExpense); // Llama a la función para agregar el nuevo gasto
    // Limpiar los campos del formulario
    setDescripcion("");
    setImporte("");
    setCategoria("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold">Agregar Gasto</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Descripción del gasto
        </label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Importe</label>
        <input
          type="number"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione una categoría</option>
          <option value="Venue">Alquiler del local</option>
          <option value="Food">Catering</option>
          <option value="Decor">Decoración</option>
          <option value="Entertainment">Música</option>
          <option value="Photography">Fotografía</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      >
        Agregar
      </button>
    </form>
  );
}
