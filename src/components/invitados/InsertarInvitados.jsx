"use client"
import { useState } from 'react';
import { supabase } from '@/utils/supabase';

const InsertarInvitados = ({ eventoID }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        eventoID: eventoID // Usamos el eventoID pasado como prop
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('invitado')
            .insert([
                { nombre: formData.firstName, apellido: formData.lastName, email: formData.email, eventoID: formData.eventoID, estado: 'pendiente'},
            ]);

        if (error) {
            console.error('Error inserting data:', error);
            setErrorMessage('Error al insertar invitado');
            setSuccessMessage('');
        } else {
            console.log('Data inserted successfully:', data);
            setSuccessMessage('Invitado creado exitosamente');
            setErrorMessage('');
            // Opcional: Reiniciar el formulario después de la inserción exitosa
            setFormData({ firstName: '', lastName: '', email: '', eventoID: eventoID });

            // Limpiar el mensaje de éxito después de 1 segundo
            setTimeout(() => {
                setSuccessMessage('');
            }, 1000);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Formulario</h1>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Apellido:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-violeta text-white rounded-lg shadow-md hover:bg-violoscuro focus:outline-none">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default InsertarInvitados;
