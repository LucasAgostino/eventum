import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import should be 'next/router'

export default function Sidebar() {
  const router = useRouter(); 
  const currentRoute = router.asPath;

  function isActive(path) {
    return window.location.pathname === path;
  }

  return (
    <div className="w-64 bg-gradient-to-b from-black to-blue-900 min-h-screen text-white">
      <div className='bg-white/10 backdrop-blur-sm border border-gray-300 shadow-lg p-4 rounded-lg min-h-screen'>
        <nav>
          <ul>
            <li className={`p-4 flex items-center ${isActive('/home') ? 'bg-blue-500 shadow-lg' : ''}`}>
              <Link href="/home">
                <div className="flex items-center w-full cursor-pointer">
                  <img src="/hogar.png" className="h-6 w-6 mr-2" alt="Home Icon" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li className={`p-4 flex items-center ${isActive('/eventos') ? 'bg-blue-500 shadow-lg' : ''}`}>
              <Link href="/eventos">
                <div className="flex items-center w-full cursor-pointer">
                  <img src="/Calendario.png" className="h-6 w-6 mr-2" alt="Eventos Icon" />
                  <span>Eventos</span>
                </div>
              </Link>
            </li>
            <li className={`p-4 flex items-center ${isActive('/eventos/presupuesto') ? 'bg-blue-500/20 shadow-lg rounded border-gray-200 ' : ''}`}>
              <Link href="/eventos/presupuesto">
                <div className="flex items-center w-full cursor-pointer">
                  <img src="/dolar.png" className="h-6 w-6 mr-2" alt="Presupuestos Icon" />
                  <span>Presupuestos</span>
                </div>
              </Link>
            </li>
            <li className={`p-4 flex items-center ${isActive('/eventos/reportes') ? 'bg-blue-500 shadow-lg' : ''}`}>
              <Link href="/eventos/reportes">
                <div className="flex items-center w-full cursor-pointer">
                  <img src="/grafico-histograma.png" className="h-6 w-6 mr-2" alt="Reportes Icon" />
                  <span>Reportes</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}