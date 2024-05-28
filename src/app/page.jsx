import Link from "next/link.js";

export default function Home() {
  return (
    <main>
      <h1 className="m-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg inline-block">Eventum</h1>      <div></div>
      <div className="relative inline-flex items-center justify-center p-4 rounded-full transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95 m-4">
        <Link href="/eventos/crear-evento">
          Crear evento
        </Link>
      </div>

    </main>

  );
}


