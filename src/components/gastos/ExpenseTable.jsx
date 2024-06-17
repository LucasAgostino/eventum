import React from 'react';
import { supabase } from '@/utils/supabase';
import { useEffect, useState } from "react";
import BotonEliminar from '../eliminar/BotonEliminar';

export default function ExpenseTable({expenses, onDelete}) {
    
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <table className="w-full mt-4">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Importe</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="bg-white even:bg-gray-100">
                            <td className="px-6 py-4 text-center">{expense.descripcion}</td>
                            <td className="px-6 py-4 text-center">${expense.importe.toFixed(2)}</td>
                            <td className="px-6 py-4 text-center">{expense.categoria}</td>
                            <td className="px-6 py-4 flex space-x-2 justify-center items-center ">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Edit</button>
                                <BotonEliminar
                                  item={expense}
                                  tableName="gasto"
                                  onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}