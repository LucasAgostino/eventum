"use client"
import React from 'react'
import { useState, useEffect} from 'react';
import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se refresque al enviar el formulario
    let { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data.session) {
      router.push('/'); // Redirige a la página de inicio
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-75"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-75 animate-particles"></div>
      </div>
      <div className="relative z-10 max-w-md w-full space-y-8 p-8 rounded-lg shadow-md bg-white">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto animate-bounce"
            src="/favicon.ico"
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-wider">
            <span className="text-blue-400">Sign in</span> to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/register">
              <span className="font-medium text-blue-400 hover:text-blue-500 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <span className="font-medium text-blue-400 hover:text-blue-500 cursor-pointer">
                Forgot your password?
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
