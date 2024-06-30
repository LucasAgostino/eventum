import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/utils/supabase';

const UploadFile = (eventoId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileUpload = async (event) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const file = event.target.files[0];
        if (!file) {
            setError('No file selected');
            setLoading(false);
            return;
        }
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const arrayBuffer = event.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

                const guests = [];
                for (let i = 1; i < worksheet.length; i++) {
                    const row = worksheet[i];
                    if (row.length >= 3) { // Asegurarse de que la fila tiene suficientes columnas
                        const guest = {
                            nombre: row[0],
                            apellido: row[1],
                            email: row[2],
                            eventoID: eventoId.eventId, // Asegurarse de que eventoID es un número
                            estado: "pendiente"
                        };
                        guests.push(guest);
                    }
                }

                setData(guests);

                // Guardar los datos en Supabase
                const { error } = await supabase.from('invitado').insert(guests);
                if (error) {
                    setError('Error al guardar en Supabase: ' + error.message);
                } else {
                    setSuccess(true);
                    console.log('Datos guardados en Supabase');
                }
            } catch (err) {
                setError('Error al procesar el archivo: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <label className="flex items-center py-3 px-4 bg-violeta text-white font-semibold rounded-lg cursor-pointer mb-6 hover:bg-violoscuro transition duration-300">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".xlsx, .xls"
                    className="hidden"
                />
                Elegir archivo
            </label>
            {loading && <p>Procesando archivo...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Datos guardados exitosamente!</p>}
        </div>
    );
};

export default UploadFile;
