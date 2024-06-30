"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: "",
    password: "",
    confirmarPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (parseInt(value) < 0) {
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmarPassword) {
      let { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.nombre,
            last_name: formData.apellido,
          },
        },
      });
      if (error) {
        alert(error.message);
      } else {
        router.push('/login');
      }
    } else {
      console.log("Contraseña diferente");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-violeta text-white p-10 rounded-b-lg md:rounded-r-lg md:rounded-b-none">
          <div className="text-center">
            <img
              src={images[currentImageIndex].src}
              alt="Illustration"
              className="mb-6"
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
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 space-y-8 bg-white">
          <div className="text-center">
            <img
              className="mx-auto h-20 w-auto"
              src="/Logo_Eventum_Title.png"
              alt="Eventum Logo"
            />
            <h2 className="mt-4 md:mt-12 text-3xl font-extrabold text-gray-900">
              <span className="text-violeta">Registrar</span> una cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ya tienes una cuenta?{" "}
              <span className="font-medium text-violeta hover:text-violoscuro">
                <Link href="/login">Iniciar sesion</Link>
              </span>
            </p>
          </div>

          <form className="mt-5 space-y-6 w-full" onSubmit={handleSignUp}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="input flex flex-col relative">
                <label
                  htmlFor="name"
                  className="text-violeta text-xs font-semibold relative top-2 ml-[7px] px-[3px] mb-3"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="nombre"
                  type="text"
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="border-violeta opacity-70 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                  placeholder="Nombre"
                />
              </div>
              <div className="input flex flex-col relative">
                <label
                  htmlFor="lastName"
                  className="text-violeta text-xs font-semibold relative top-2 ml-[7px] px-[3px] mb-3 w-full"
                >
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="apellido"
                  type="text"
                  onChange={handleChange}
                  autoComplete="lastName"
                  required
                  className="border-violeta opacity-70 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                  placeholder="Apellido"
                />
              </div>
              <div className="input flex flex-col relative">
                <label
                  htmlFor="email"
                  className="text-violeta text-xs font-semibold relative top-2 ml-[7px] px-[3px] w-full mb-3"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="border-violeta opacity-70 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                  placeholder="Direccion Email"
                />
              </div>
              <div className="input flex flex-col relative">
                <label
                  htmlFor="password"
                  className="text-violeta text-xs font-semibold relative top-2 ml-[7px] px-[3px] mb-3 w-full"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="border-violeta opacity-70 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                  placeholder="Contraseña"
                />
              </div>
              <div className="input flex flex-col relative">
                <label
                  htmlFor="passwordConfirmation"
                  className="text-violeta text-xs font-semibold relative top-2 ml-[7px] px-[3px] mb-3 w-full"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="passwordConfirmation"
                  name="confirmarPassword"
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="border-violeta opacity-70 input px-[10px] py-[11px] text-xs border-2 rounded-[5px] w-full focus:outline-none placeholder-text-black/25"
                  placeholder="Confirmar contraseña"
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
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
