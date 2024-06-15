import React from 'react';

export default function ExpenseTable() {
    const expenses = [
        { name: 'Alquiler del local', amount: 2500, category: 'Venue' },
        { name: 'Catering', amount: 3800, category: 'Food' },
        { name: 'Decoración', amount: 1200, category: 'Decor' },
        { name: 'Música', amount: 800, category: 'Entertainment' },
        { name: 'Fotografía', amount: 15000, category: 'Photography' },
        { name: 'Flores', amount: 400, category: 'Photography' },
    ];

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <table className="w-full mt-4">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index} className="bg-white even:bg-gray-100">
                            <td className="px-6 py-4 text-center">{expense.name}</td>
                            <td className="px-6 py-4 text-center">${expense.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 text-center">{expense.category}</td>
                            <td className="px-6 py-4 flex space-x-2 justify-center items-center ">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Edit</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}