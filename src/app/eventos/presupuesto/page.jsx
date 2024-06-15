"use client"
import Head from 'next/head';
import Sidebar from '@/components/NavbarVertical';
import SalesOverview from '@/components/SalesOverview';
import AddExpenseForm from '@/components/AddExpenseForm';
import ExpenseTable from '@/components/ExpenseTable';

export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-black to-blue-900 overflow-hidden min-h-screen bg-gradient-to-b from-black to-blue-900">
      <Head>
        <title>Event Expenses</title>
      </Head>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <header className="bg-gradient-to-t from-black to-blue-900 shadow p-4">
          <h1 className="text-4xl font-semibold text-center text-white">Gastos del Evento</h1>
        </header>
        <main className="flex-grow p-4 flex">
          <div className="flex-grow p-4">
            <SalesOverview />
          </div>
          <div className="w-1/3 p-4">
            <AddExpenseForm />
          </div>
        </main>
        <footer className="p-4">
          <ExpenseTable />
        </footer>
      </div>
    </div>
  );
}