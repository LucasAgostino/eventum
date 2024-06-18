import React from "react";
import BotonEliminar from "../eliminar/BotonEliminar";

export default function ExpenseTable({ expenses, onDelete }) {
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold p-4">Expenses</h2>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripcion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Importe
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.descripcion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${expense.importe.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.categoria}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center items-center">
                  <BotonEliminar
                    item={expense}
                    tableName="gasto"
                    onDelete={onDelete}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
