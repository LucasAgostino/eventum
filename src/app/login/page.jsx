"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';
import { LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMessage(error.message);
      setShowPopup(true);
      setFormData({ email: "", password: "" });
    } else {
      router.push('/');
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 space-y-8 bg-white">
          <div className="text-center">
            <img
              className="mx-auto h-20 w-auto"
              src="/Logo_Eventum_Title.png"
              alt="Eventum Logo"
            />
            <h2 className="mt-4 md:mt-14 text-3xl font-extrabold text-gray-900">
              <span className="text-violeta">Iniciar sesión</span> con tu cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              O{" "}
              <Link href="/register">
                <span className="font-medium text-violeta hover:text-violet-950 cursor-pointer">
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
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Dirección Email"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-violeta hover:text-violet-950 cursor-pointer">
                  <a href="/reset-password">¿Olvidaste tu contraseña?</a>
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violeta hover:bg-violoscuro focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-violet-500 group-hover:text-violet-900"
                    aria-hidden="true"
                  />
                </span>
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-violeta text-white p-10 rounded-b-lg md:rounded-r-lg md:rounded-b-none">
          <div className="text-center">
            <img
              src={images[currentImageIndex].src}
              alt="Illustration"
              className="mb-6 transition-shadow"
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Error de inicio de sesión</h2>
            <p className="mb-4">Ingreso de datos invalido</p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-violeta text-white rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
