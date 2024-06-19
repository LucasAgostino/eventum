"use client"
import React from 'react'
import { useState, useEffect} from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { LockClosedIcon, MailIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifica si el valor ingresado es un número y no es negativo antes de actualizar el estado
    if (parseInt(value) < 0) {
      return; // No actualices el estado si el valor no es un número o es negativo
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se refresque al enviar el formulario
    const {error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error(error);
      return;
    }
    else{
      router.push('/'); // Redirige a la página de inicio
    }

  };

  const images = [
    { src: "/Register.png", text: "¡Transforma tus eventos en experiencias inolvidables!", subtext: "Organiza mejor tus eventos y asegura el éxito en cada detalle." },
    { src: "/Login.png", text: "¡Sorprende a tus invitados!", subtext: "Optimiza el envio de invitaciones y marca la diferencia con un toque de elegancia y eficiencia."},
    { src: "/Login2.png", text: "Mantente al dia y no te pierdas ninguna fecha", subtext: "Organiza tus compromisos con precision y asegura que cada evento sea especial" }
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-3/4 h-3/4 flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex flex-col items-center justify-center p-8 space-y-8 bg-white">
          <div className="text-center">
            <img
              className="mx-auto h-20 w-auto "
              src="/Logo_Eventum_Title.png"
              alt="Eventum Logo"
            />
            <h2 className="mt-14 text-3xl font-extrabold text-gray-900">
              <span className="text-blue-600">Iniciar sesión</span> con tu cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              O{" "}
              <Link href="/register">
                <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Registrarse
                </span>
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6 w-full">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Dirección Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Dirección Email"  
                />
                
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center bg-blue-700 text-white p-10 rounded-r-lg">
          <div className="text-center" >
            <img
              src={images[currentImageIndex].src}
              alt="Illustration"
              className="mb-6 transition-shadow "
            />
            <p className="text-xl font-semibold mb-2">
            {images[currentImageIndex].text}
            </p>
            <p>
            {images[currentImageIndex].subtext}
            </p>
          </div>
          <div className="flex mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
