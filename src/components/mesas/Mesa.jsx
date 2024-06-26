import React from 'react';

const Mesa = ({ nombre, capacidad, invitados, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center bg-[#274690] text-white p-8 rounded-sm shadow-lg w-60 h-60 cursor-pointer ">
      <h2 className="text-xl mb-2">{nombre}</h2>
      <p className="text-lg">{invitados}/{capacidad}</p>
    </div>
  );
};

export default Mesa;