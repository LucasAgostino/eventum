import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Uso correcto según tu configuración
import { useState } from 'react';

const menuItems = [
  { path: '/home', icon: '/hogar.png', text: 'Home'},
  { path: '/eventos', icon: '/Calendario.png', text: 'Eventos' },
  {path: '/eventos/presupuesto', icon: '/dolar.png', text: 'Presupuestos'},
  {path: '/eventos/reportes', icon: '/grafico-histograma.png', text: 'Reportes'},
  {path: '/eventos/invitados', icon: '/user.png', text: 'Invitados'},
  {path: '/eventos/invitados/crear-invitados', icon: '/añadir-invitado.png', text: 'Añadir Invitados'}
  // Añade más elementos aquí
];

export default function Sidebar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla si el menú está abierto o cerrado

  function isActive(path) {
    return router.asPath === path; // Determina si el camino actual es activo
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado para expandir o contraer el menú
  }

  return (
    <div className={`bg-gradient-to-b from-black to-blue-900 min-h-screen text-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-64' : 'w-25'}`}>
      <div className='bg-white/10 backdrop-blur-sm border border-gray-300 shadow-lg p-4 rounded-lg min-h-screen'>
        <nav>
          <ul>
            <li onClick={toggleMenu} className="p-4 flex items-center cursor-pointer">
              <img src="/menu.png" className="h-6 w-6" alt="Menu Icon" />
              {isMenuOpen && <span className="ml-2">Menú</span>}
            </li>
            {menuItems.map(({ path, icon, text }) => (
              <li key={path} className={`p-4 flex items-center ${isActive(path) ? 'bg-blue-500 shadow-lg' : ''}`}>
                <div className="flex items-center w-full cursor-pointer mt-4">
                  <img src={icon} className="h-6 w-6" alt={`${text} Icon`} />
                  {isMenuOpen && <span className="ml-3">{text}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}