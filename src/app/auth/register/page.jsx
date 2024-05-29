"use client"
import React from 'react'
import { useState, useEffect} from 'react';
import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
      email: '',
      nombre: '',
      apellido: '',
      password: '',
      confirmarPassword: ''
    });

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
      if (formData.password === formData.confirmarPassword){
        console.log(formData)
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.nombre,
              last_name: formData.apellido
            }
          }
        })

      }
      else{
        //agregar notificacion de error como el form de eventos
        console.log("Contraseña diferente") 
      }
      
      /*
      // Intentar insertar el nuevo registro en la base de datos
      const { error } = await supabase.from('evento').insert({
          nombreEvento: formData.nombreEvento,
          cantInvitados: formData.cantInvitados,
          fecha: formData.fecha,
          ubicacion: formData.ubicacion,
          presupuestoEstimado: formData.presupuestoEstimado
      });
  
      if (error) {
        // Si hay un error, lanzarlo para ser capturado por el bloque catch
        throw error;
      }
              */
      

    };


    return (
      <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-md bg-white ">
          <div>
            <div className='flex justify-center items-center'> 
              <img src= '/favicon.ico' alt= '' style={{height:'80px', width: '80px'}} /> 
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              <span className="tex-blue-400">Sign up</span> for an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <span className="font-medium text-blue-600 hover:text-blue-500">
                <Link href="/auth/login">Log in here</Link>
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="input flex flex-col relative">
                <label htmlFor="name" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-full">Nombre:</label>
                <input
                  id="name"
                  name="nombre"
                  type="text"
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                />
              </div>
              <div className="input flex flex-col relative">
                <label htmlFor="lastName" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-full">Apellido:</label>
                <input
                  id="lastName"
                  name="apellido"
                  type="text"
                  onChange={handleChange}
                  autoComplete="lastName"
                  required
                  className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                />
              </div>
              <div className="input flex flex-col relative">
                <label htmlFor="email" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-full">Email address:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                />
              </div>
              <div className="input flex flex-col relative">
                <label htmlFor="password" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-full">Password:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                />
              </div>
              <div className="input flex flex-col relative">
                <label htmlFor="passwordConfirmation" className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-full">Confirmar Password:</label>
                <input
                  id="passwordConfirmation"
                  name="confirmarPassword"
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              {/* Aquí puedes agregar cualquier otra opción de registro, como recordar usuario, términos y condiciones, etc. */}
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  