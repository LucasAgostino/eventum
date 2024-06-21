// pages/expensesPage.js
"use client";
import Head from "next/head";
import Sidebar from "@/components/NavbarVertical";
import SidebarDer from "@/components/SidebarDer";
import SalesOverview from "@/components/gastos/SalesOverview";
import AddExpenseForm from "@/components/gastos/AddExpenseForm";
import ExpenseTable from "@/components/gastos/ExpenseTable";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Popup from "@/components/Popup"; // Asegúrate de importar el componente de Popup

function ExpensesPage({ params }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [presupuestoMax, setPresupuestoMax] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleDelete = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: expensesData, error: expensesError },
          { data: eventData, error: eventError },
        ] = await Promise.all([
          supabase.from("gasto").select("*").eq("eventoId", params.id),
          supabase
            .from("evento")
            .select("presupuestoEstimado")
            .eq("id", params.id)
            .single(),
        ]);

        if (expensesError) {
          console.error("Error fetching expenses:", expensesError);
        } else {
          setExpenses(expensesData);
        }

        if (eventError) {
          console.error("Error fetching event:", eventError);
        } else if (eventData) {
          setPresupuestoMax(eventData.presupuestoEstimado);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const addExpense = async (newExpense) => {
    console.log(newExpense);
    const { error } = await supabase
      .from("gasto")
      .insert([{ ...newExpense, eventoId: params.id }]);

    if (error) {
      console.error("Error adding expense: ", error);
    } else {
      const { data, fetchError } = await supabase
        .from("gasto")
        .select("*")
        .eq("eventoId", params.id);

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
        <title>Gastos evento</title>
      </Head>
      <SidebarDer onToggle={(isOpen) => setSidebarOpen(isOpen)} />
      <div
        className={`flex flex-col flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-25"
        }`}
      >
        <header className="p-4">
          <h1 className="text-3xl font-bold text-gray-900">Gastos del Evento</h1>
        </header>
        <main className="flex-grow p-4 flex">
          <div className="flex-grow p-4">
            {presupuestoMax !== null && (
              <SalesOverview
                expenses={expenses}
                presupuestoMax={presupuestoMax}
              />
            )}
          </div>
          <div className="w-1/3 p-4">
            <AddExpenseForm
              addExpense={addExpense}
              expenses={expenses}
              presupuestoMax={presupuestoMax}
              setShowPopup={setShowPopup}
              setPopupMessage={setPopupMessage}
            />
          </div>
        </main>
        <div className="p-4 mr-4 ml-4">
          <ExpenseTable expenses={expenses} onDelete={handleDelete} />
        </div>
      </div>
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default ExpensesPage;
