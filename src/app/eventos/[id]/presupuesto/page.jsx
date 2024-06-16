"use client";
import Head from "next/head";
import Sidebar from "@/components/NavbarVertical";
import SalesOverview from "@/components/gastos/SalesOverview";
import AddExpenseForm from "@/components/gastos/AddExpenseForm";
import ExpenseTable from "@/components/gastos/ExpenseTable";
import { useEffect, useState } from "react";
import withAuth from "@/utils/withAuth";

function ExpensesPage({ params }) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-black to-blue-900 overflow-hidden min-h-screen bg-gradient-to-b from-black to-blue-900">
      <Head>
        <title>Event Expenses</title>
      </Head>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="bg-gradient-to-t from-black to-blue-900 shadow p-4">
          <h1 className="text-4xl font-semibold text-center text-white">
            Gastos del Evento
          </h1>
        </header>
        <main className="flex-grow p-4 flex">
          <div className="flex-grow p-4">
            <SalesOverview />
          </div>
          <div className="w-1/3 p-4">
            <AddExpenseForm eventoId={params.id} />
          </div>
        </main>
        <footer className="p-4">
          <ExpenseTable eventoID={params.id} />
        </footer>
      </div>
    </div>
  );
}
export default withAuth(ExpensesPage);