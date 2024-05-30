"use client"
import Link from 'next/link';
import { supabase } from '@/app/utils/supabase';
import React, { useEffect, useRef, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import Chart from 'chart.js/auto';
import withAuth from './utils/withAuth';

const Home = ({ id, nombreevento, cantinvi, onDelete, FechaEvento }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Referencia al objeto Chart
  const [idEventoSeleccionado, setIdEventoSeleccionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [nombreEvento, setNombreEvento] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cantInvitados, setcantInvitados] = useState(0);
  const [fecha, setFecha] = useState('');
  const [presupuestoEstimado, setPresupuestoEstimado] = useState(0);
  const fechaFormateada = fecha.split('/').reverse().join('-');

  useEffect(() => {
    async function fetchEventos() {
      
      const { data: eventos, error } = await supabase.from('evento').select();
      if (error) {
        console.error('Error fetching eventos:', error.message);
      } else {
        setEventos(eventos);
      }
    }
    fetchEventos();
  }, []);


  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    
    const data = {
      
      datasets: [{
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }]
    };

    const options = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };

    // Destruye el gráfico anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crea un nuevo gráfico y guarda la instancia para poder destruirlo más tarde
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });

    // Devuelve una función para limpiar el gráfico al desmontar el componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (idEventoSeleccionado) {
      const eventoSeleccionado = eventos.find(evento => evento.id === idEventoSeleccionado);
      if (eventoSeleccionado) {
        setFecha(eventoSeleccionado.fecha);
      }
    }
  }, [idEventoSeleccionado, eventos]);

  return (
    <div className="flex flex-col " >
      <h1 className="m-4 text-5xl font-bold text-blue-700 text-center ">Dashboard</h1>
      <div className="relative inline-flex items-center justify-center p-4 rounded-full transition duration-200 font-bold text-gray-700 shadow-lg bg-blue-300 hover:bg-blue-400 hover:text-indigo-900 transform hover:scale-95 m-4">
        <Link href="/eventos/crear-evento">
          Crear evento
        </Link>
      </div>
      <div className='flex flex-file justify-center'> 
        {/* Tarjeta de evento */}
        <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg ml-4" style={{height:'400px', width:'800px'}}>
          <h1 className="text-xl font-bold mb-2">Próximo evento</h1>
          <div className="flex items-center mb-">
            <img src='Favicon.ico' className='h-20px w-20px'></img>
            <div>
              <h2 className="text-3xl font-semibold mb-12"><strong>{nombreevento}Casamiento de Jazmín</strong></h2>
              <p className="text-gray-600 text-sm mb-2"><strong> Fecha: </strong>{FechaEvento}20 de Julio 2024</p>
              <p className="text-gray-600 text-sm">📍Victoria Ocampo 100, CAutónoma de Buenos Aires</p>
            </div>
          </div>
          <div>
            <div className='flex mt-10'>
              <p className='text-2xl text-black'><strong>Estado de invitaciones </strong></p>
              <div>
                <p className="text-sm text-gray-600 ml-10 bg-gray-200 p-2 rounded-sm" >🟢Enviadas </p>
              </div>
            </div> 
            <div className="text-sm text-gray-600 mt-3">
              <div className="inline-block bg-gray-200 p-2 rounded-sm">
                <strong>120/480</strong>
              </div>
            </div>
          </div>
          
        </div>

       {/*} <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg" style={{ height: '300', width: '800px' }}>
          <div className='flex'>
            <h2 className="text-xl font-bold mb-2">Próximo evento</h2>
            <div className="flex items-center mb-4">
              <img src='/favicon.ico' alt="Icono del evento" className="w-20 h-20" />
            <div>
                <h3 className="text-lg font-semibold">{nombreEvento}Casamiento de Jazmín</h3>
                <p className="text-gray-600 text-sm">Fecha: {FechaEvento}</p>
                <p className="text-gray-600 text-sm">Victoria Ocampo 100, CAutónoma de Buenos Aires</p>
              </div>
            </div>
            <div className="bg-gray-200 p-2 rounded-lg">
              <p className="text-sm text-gray-600">Estado de invitaciones: Enviadas 120/480</p>
            </div>
          </div>
          
    </div> */} 
      {/* Chart a la derecha */}
      <div
        className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg ml-4" style={{ height: '400px', width: '800px' }}>
        <div className="px-10 py-6 flex justify-between items-center">
          <h3 className="text-zinc-900 dark:text-black text-2xl"><strong>Progress</strong></h3>
          
          <div className="flex items-center justify-center">
            <canvas ref={chartRef} style={{maxHeight: '200px', maxWidth:'600px'}}></canvas>
          </div>
          <svg
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-zinc-900 dark:text-white"
            xmlns="http://www.w3.org/2000/svg" 
            >
            <path
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinejoin="round"
              strokeLinecap="round"
              ></path>
          </svg>
        </div>
        <div className="px-5 pb-5">
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            File: var/test/admin.php extracted..
          </p>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
            <div style={{width: "70%"}}  className="bg-blue-600 h-2.5 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">70% Complete</span>
            <button className="text-xs text-blue-600 hover:underline">Details</button>
          </div>
        </div>
        
      
      </div> 
      </div>
      <div className="flex overflow-x-auto justify-arround">
        <div className="overflow-x-auto flex-grow m-4" style={{ maxWidth: '100vw', textAlign: 'center'}}>
          <table className="w-full divide-y divide-gray-200 bg-blue-900 border border-gray-300">
            <thead className="bg-gray-50">
              <tr className='bg-blue-700 hover:bg-blue-600 rounded-t-lg rounded-b-lg '>
                <th scope="col" className="w-1/10 px-2 py-2 whitespace-nowrap text-sm text-white bg-blue-800 border border-black">Imagen</th>
                <th scope="col" className="w-1/14 px-2 py-2 whitespace-nowrap text-sm text-white bg-blue-800 border border-black">Nombre del Evento</th>
                <th scope="col" className="w-1/14 px-2 py-2 whitespace-nowrap text-sm text-white bg-blue-800 border border-black">Fecha del Evento</th>
                <th scope="col" className="w-1/14 px-2 py-2 whitespace-nowrap text-sm text-white bg-blue-800 border border-black">Cantidad de Invitados</th>
                <th scope="col" className="w-1/14 px-2 py-2 whitespace-nowrap text-sm text-white bg-blue-800 border border-black">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventos.map(evento => (
                <tr key={evento.id} className='hover:shadow-lg' onClick={() => setIdEventoSeleccionado(evento.id)}>
                  <td className="px-2 py-2 bg-blue-950 border border-grey text-center">
                    <div className='flex justify-center items-center'> 
                      <img src='/User.ico' alt='' className='w-14 h-14 rounded-2xl '/>
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap border border-grey">{evento.nombreEvento}</td>
                  <td className="px-2 py-2 whitespace-nowrap border border-grey">{evento.fecha}</td>
                  <td className="px-2 py-2 whitespace-nowrap border border-grey">{evento.cantInvitados}</td>
                  <td className="px-2 py-2 whitespace-nowrap border border-grey">
                    {/* Contenedor flex para los iconos */}
                    <div className="flex" style={{ justifyContent: 'center' }}>
                      {/* Botón de eliminar con ícono */}
                      <button onClick={() => confirmarEliminacion(evento.id)} className="text-red-600 hover:text-red-900">
                        <IconTrash size={20} />
                      </button>
                      {/* Botón de editar con ícono */}
                      <button onClick={() => handleEditar (evento.id) } className="ml-1 text-blue-600 hover:text-blue-900">
                        {/* Reemplaza el ícono por el correspondiente al editar */}
                        <svg className="w-5 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default withAuth(Home);