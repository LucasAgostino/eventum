"use client";
import Head from "next/head";
import Sidebar from "@/components/NavbarVertical";
import SidebarDer from "@/components/SidebarDer";
import SalesOverview from "@/components/gastos/SalesOverview";
import AddExpenseForm from "@/components/gastos/AddExpenseForm";
import ExpenseTable from "@/components/gastos/ExpenseTable";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";
import { supabase } from "@/utils/supabase"; // Asegúrate de importar correctamente el cliente de Supabase

function ExpensesPage({ params }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);


  const handleDelete = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  // Función para cargar los gastos iniciales
  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('gasto') // Asegúrate de que 'expenses' es el nombre de tu tabla en Supabase
        .select('*')
        .eq('eventoId', params.id); // Filtra por el ID del evento

      if (error) {
        console.error("Error fetching expenses: ", error);
      } else {
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, [params.id]);

  // Función para agregar un nuevo gasto
  const addExpense = async (newExpense) => {
    console.log(newExpense)
    const { error } = await supabase
      .from('gasto')
      .insert([{ ...newExpense, eventoId: params.id }]);

    if (error) {
      console.error("Error adding expense: ", error);
    } else {
      // Volver a cargar los gastos después de insertar
      const { data, fetchError } = await supabase
        .from('gasto')
        .select('*')
        .eq('eventoId', params.id);

      if (fetchError) {
        console.error("Error fetching updated expenses: ", fetchError);
      } else {
        setExpenses(data);
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden min-h-screen">
      <Head>
        <title>Event Expenses</title>
      </Head>
      <SidebarDer onToggle={(isOpen) => setSidebarOpen(isOpen)} />
      <div
        className={`flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-25"
        }`}
      >
        <header className="p-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Gastos del Evento
          </h1>
        </header>
        <main className="flex-grow p-4 flex">
          <div className="flex-grow p-4 mr-4"> {/* Ajuste de margen derecho */}
            <SalesOverview expenses={expenses}/>
          </div>
          <div className="w-1/3 p-4 ml-4"> {/* Ajuste de margen izquierdo */}
            <AddExpenseForm addExpense={addExpense} />
          </div>
        </main>
        <div className="p-4 mr-20 ml-8">
          <ExpenseTable expenses={expenses} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
