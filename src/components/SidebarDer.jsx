"use client"
import { useState } from 'react';

const checklistItems = [
  { id: 1, label: 'Enviar Invitaciones' },
  { id: 2, label: 'Ordenar Mesas' },
  { id: 3, label: 'Establecer Precio' },
  // Añade más ítems según necesites
];

const eventDetails = {
  fecha: '15 de junio, 2024',
  ubicacion: 'Palacio Alsina, CABA, Buenos Aires',
  horario: '9:00 PM - 6:00 AM'
};

export default function SidebarDer() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: '115px', // Ajusta este valor para mover el sidebar hacia abajo
      height: isOpen ? 'calc(100vh - 60px)' : '60px', // Ajusta la altura según el desplazamiento
      width: isOpen ? '300px' : '60px',
      transition: 'all 0.3s ease-in-out',
      color: 'white',
      overflowY: isOpen ? 'auto' : 'hidden',
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro para el icono
      borderRadius: isOpen ? '0' : '10px',
      display: 'flex',
      flexDirection: 'column', // Para alinear el contenido verticalmente
      alignItems: 'center', // Para centrar el ícono horizontalmente
      justifyContent: isOpen ? 'flex-start' : 'center', // Para centrar el ícono verticalmente cuando está cerrado
    }} className='bg-gradient-to-b from-black to-blue-900/80 text-white transition-all duration-300 ease-in-out backdrop-blur-sm border border-gray-300 shadow-lg'>
      <div style={{
        width: '50px',
        height: '50px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001, // Asegurar que esté por encima del contenido
      }} onClick={toggleSidebar}>
        <img src="/lista.png" alt="Toggle Sidebar" style={{ width: '30px', height: '30px' }} />
      </div>
      {isOpen && (
        <div style={{ padding: '20px', marginTop: '10px', width: '100%' }}>
          <h1 className="text-center text-3xl font-bold mb-4">Checklist</h1>
          <h2 className="text-lg font-semibold mb-6 bt-10">Tareas</h2>
          {checklistItems.map(item => (
            <div key={item.id} className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="scale-100 transition-all duration-500 ease-in-out hover:scale-110 checked:scale-100 w-6 h-6"
                  id={`check-item-${item.id}`}
                />
                <span className="ml-2">{item.label}</span>
              </label>
            </div>
          ))}
          <h2 className="text-lg font-semibold mt-10 mb-4">Detalles del Evento</h2>
          <div className="mb-4 flex items-center">
            <img src="/Calendario.png" alt="Fecha" className="h-6 w-6 mr-4"/>
            <div>
              <strong>Fecha:</strong> {eventDetails.fecha}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <img src="/marcador.png" alt="Ubicación" className="h-6 w-6 mr-4"/>
            <div>
              <strong>Ubicación:</strong> {eventDetails.ubicacion}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <img src="/reloj.png" alt="Horario" className="h-6 w-6 mr-4"/>
            <div>
              <strong>Horario:</strong> {eventDetails.horario}
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
            Añadir Tarea
          </button>
        </div>
      )}
    </div>
  );
}
