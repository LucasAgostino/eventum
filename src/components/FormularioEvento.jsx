import React from 'react'
import { useState, useEffect} from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useUserSession } from '@/context/UserSessionContext';

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
      presupuestoEstimado: ''
    });

  useEffect(() => {
    // Access the router here
    const { query } = router;
    console.log(query);
  }, [router]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      // Verifica si el valor ingresado es un número y no es negativo antes de actualizar el estado
      if (parseInt(value) < 0) {
        return; // No actualices el estado si el valor no es un número o es negativo
      }
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // Evita que la página se refresque al enviar el formulario
  
      try {
        // Intentar insertar el nuevo registro en la base de datos
        const { error } = await supabase.from('evento').insert({
          nombreEvento: formData.nombreEvento,
          cantInvitados: formData.cantInvitados,
          fecha: formData.fecha,
          ubicacion: formData.ubicacion,
          presupuestoEstimado: formData.presupuestoEstimado,
          userID: user.id
          });
  
        if (error) {
          console.log(user.id)
          console.log("hola")
          // Si hay un error, lanzarlo para ser capturado por el bloque catch
          throw error;
        }
  
        // Si la inserción es exitosa, mostrar la notificación de éxito
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
          router.push('/eventos'); // Redireccionar después de ocultar la notificación
        }, 2000); // Ocultar la notificación después de 2 segundos
  
      } catch (error) {
        // Manejar el error y mostrar una notificación de error
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
        }, 2000); // Ocultar la notificación después de 2 segundos
      }
    };
  
  return (
    <div>{showNotification && (
      <div className={`fixed bottom-0 right-0 mb-4 mr-4 ${notificationClass} text-white px-4 py-2 rounded shadow flex items-center animate-push-up`}>
        {notificationIcon}
        {notificationContent}
      </div>
    )}
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-blue-100 p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="nombreEvento" className="block text-blue-900 font-bold mb-2">Nombre del Evento:</label>
        <input
          type="text"
          id="nombreEvento"
          name="nombreEvento"
          value={formData.nombreEvento}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cantInvitados" className="block text-blue-900 font-bold mb-2">Cantidad de Invitados:</label>
        <input
          type="number"
          id="cantInvitados"
          name="cantInvitados"
          value={formData.cantInvitados}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fecha" className="block text-blue-900 font-bold mb-2">Fecha del Evento:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ubicacion" className="block text-blue-900 font-bold mb-2">Ubicación del Evento:</label>
        <input
          type="text"
          id="ubicacion"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="presupuestoEstimado" className="block text-blue-900 font-bold mb-2">Presupuesto Estimado:</label>
        <input
          type="number"
          id="presupuestoEstimado"
          name="presupuestoEstimado"
          value={formData.presupuestoEstimado}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Crear evento
        </button>
    </form>
    </div>
  );
}

export default FormularioEvento;

