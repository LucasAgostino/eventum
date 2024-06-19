// components/gastos/AddExpenseForm.js
import { useState } from "react";

export default function AddExpenseForm({ addExpense, expenses = [], presupuestoMax, setShowPopup, setPopupMessage }) {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [categoria, setCategoria] = useState("");
  
  const totalAmount = expenses
    .reduce((sum, expense) => sum + expense.importe, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalTotal = parseFloat(totalAmount) + importe;
    
    if (totalTotal <= presupuestoMax) {
      const newExpense = {
        descripcion,
        importe: parseFloat(importe),
        categoria,
      };
      await addExpense(newExpense);
    } else {
      // Lógica para pop-up de error, supera presupuesto definido
      setPopupMessage("El gasto supera el presupuesto definido.");
      setShowPopup(true);
    }
    // Limpiar los campos del formulario
    setDescripcion("");
    setImporte("");
    setCategoria("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Gasto</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Descripción del gasto
        </label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Ej: Alquiler de toro mecánico"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Importe</label>
        <input
          type="number"
          value={importe}
          onChange={(e) => setImporte(parseFloat(e.target.value))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="$"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Categoría</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Seleccione una categoría</option>
          <option value="Alquiler del local">Alquiler del local</option>
          <option value="Comida">Comida</option>
          <option value="Decoración">Decoración</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Fotografía">Fotografía</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Agregar
      </button>
    </form>
  );
}
