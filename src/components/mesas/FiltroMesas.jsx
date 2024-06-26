import React from 'react';

const FiltroMesas = ({ filtros, filtroActual, setFiltro }) => {
  return (
    <div className="space-x-2 mb-4">
      {filtros.map((filtro) => (
        <button
          key={filtro}
          className={`px-4 py-2 shadow-lg shadow-gray-400  rounded-full border-neutral-800 ${filtro === filtroActual ? 'bg-blue-800 text-white' : 'bg-gray-200 text-[#706F6F]' } `}
          onClick={() => setFiltro(filtro)}
          
        >
          <div className='flex'>
            Mesas {filtro} 
            <img src='/juventud.png' className='ml-3' style={{height:'20px', width:'20px'}}></img>
          </div>
        
        </button>
      ))}
    </div>
  );
};

export default FiltroMesas;