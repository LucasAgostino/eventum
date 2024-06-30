const Mesa = ({ nombre, capacidad, asignados, onClick }) => {
  let imgSrc;

  if (capacidad === 1) {
    imgSrc = "/mesa_silla1.svg";
  } else if (capacidad === 2) {
    imgSrc = "/mesa_silla2.svg";
  } else if (capacidad === 3) {
    imgSrc = "/mesa_silla3.svg";
  } else if (capacidad === 4) {
    imgSrc = "/mesa_silla4.svg";
  } else if (capacidad === 5) {
    imgSrc = "/mesa_silla5.svg";
  } else if (capacidad === 6) {
    imgSrc = "/mesa_silla6.svg";
  } else if (capacidad === 7) {
    imgSrc = "/mesa_silla7.svg";
  } else {
    imgSrc = "/mesa_silla8.svg";
  }

  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center bg-gray-200 text-black p-8 rounded-sm shadow-lg w-60 h-60 cursor-pointer">
      <div> 
        <img src={imgSrc} alt={`mesa${capacidad}`} />
      </div>
      <h2 className="text-xl mb-2">MESA N° {nombre}</h2>
      <p className="text-lg">{asignados}/{capacidad}</p>
    </div>
  );
};

export default Mesa;