import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useUserSession } from '@/context/UserSessionContext'; 
import dynamic from 'next/dynamic';

// Importar dinámicamente LocationSearchInput para evitar problemas de SSR
const LocationSearchInput = dynamic(() => import('../LocationSearchInput'), { ssr: false });

function FormularioEvento() {
  const router = useRouter();
  const { user } = useUserSession();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState('');
  const [notificationClass, setNotificationClass] = useState('bg-green-500');
  const [notificationIcon, setNotificationIcon] = useState(null);
  const [formData, setFormData] = useState({
    nombreEvento: '',
    cantInvitados: '',
    fecha: '',
    ubicacion: '',
    presupuestoEstimado: '',
    descripcion: ''
  });

  useEffect(() => {
    const { query } = router;
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'presupuestoEstimado') {
      handlePresupuestoChange(value);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handlePresupuestoChange = (value) => {
    value = value.replace(/\D/g, ''); // Eliminar cualquier carácter no numérico
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const formattedValue = new Intl.NumberFormat('es-ES', options).format(value / 100);
    setFormData(prevState => ({
      ...prevState,
      presupuestoEstimado: formattedValue
    }));
  };

  const handleSelectLocation = ({ address }) => {
    setFormData(prevState => ({
      ...prevState,
      ubicacion: address
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedPresupuesto = parseFloat(formData.presupuestoEstimado.replace(/\./g, '').replace(/,/g, '.'));
      const defaultTasks = [
        { descripcion: 'Completar información faltante'},
        { descripcion: 'Cargar gastos'},
        { descripcion: 'Cargar lista invitados'},
        { descripcion: 'Enviar invitaciones'},
        { descripcion: 'Asignar invitados a las mesas'}
      ];
      
      const { data, error } = await supabase.from('evento').insert({
        nombreEvento: formData.nombreEvento,
        cantInvitados: formData.cantInvitados,
        fecha: formData.fecha,
        ubicacion: formData.ubicacion,
        presupuestoEstimado: formattedPresupuesto,
        Detalle : formData.descripcion, // Nuevo campo
        userID: user.id
      }).select('*');

      if (error) {
        console.log(user);
        throw error;
      }
      
      const checklistTasks = defaultTasks.map(task => ({
        ...task,
        id_evento: data[0].id // Asumimos que el campo de relación en la tabla 'checklist' es 'event_id'
      }));

      const { error: checklistError } = await supabase.from('checklist').insert(checklistTasks);
      
      if (checklistError) {
        throw checklistError;
      }
      
      setNotificationContent('El evento se ha creado correctamente');
      setNotificationClass('bg-green-500');
      setNotificationIcon(
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        router.push(`/eventos/${data[0].id}`);
      }, 2000);

    } catch (error) {
      console.error("Error al crear el evento:", error);
      setNotificationContent('Hubo un error al crear el evento. Por favor, inténtalo de nuevo.');
      setNotificationClass('bg-red-500');
      setNotificationIcon(
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  return (
    <div>
      {showNotification && (
        <div className={`fixed bottom-0 right-0 mb-4 mr-4 ${notificationClass} text-white px-4 py-2 rounded shadow flex items-center animate-push-up`}>
          {notificationIcon}
          {notificationContent}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-blue-100 p-8 rounded-lg shadow-lg mt-20 bg-gray-200">
        <div className="mb-4">
          <label htmlFor="nombreEvento" className="block text-violeta font-bold mb-2">Nombre del Evento:</label>
          <input
            type="text"
            id="nombreEvento"
            name="nombreEvento"
            value={formData.nombreEvento}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
            placeholder="Ingrese el nombre del evento"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cantInvitados" className="block text-violeta font-bold mb-2">Cantidad de Invitados:</label>
          <input
            type="number"
            id="cantInvitados"
            name="cantInvitados"
            value={formData.cantInvitados}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
            placeholder="Ingrese la cantidad de invitados"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-violeta font-bold mb-2">Fecha del Evento:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ubicacion" className="block text-violeta font-bold mb-2">Ubicación del Evento:</label>
          <LocationSearchInput onSelect={handleSelectLocation} />
        </div>
        <div className="mb-4">
          <label htmlFor="presupuestoEstimado" className="block text-violeta font-bold mb-2">Presupuesto Estimado:</label>
          <input
            type="text"
            id="presupuestoEstimado"
            name="presupuestoEstimado"
            value={formData.presupuestoEstimado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
            placeholder="$"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-violeta font-bold mb-2">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-violet-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-900"
            placeholder='Ingrese una descripción para el evento'
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violeta text-white font-bold py-2 px-4 rounded hover:bg-violoscuro focus:outline-none"
        >
          Crear evento
        </button>
      </form>
    </div>
  );
}

export default FormularioEvento;
