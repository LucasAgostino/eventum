import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import "./gastos/chartSetup"; // Asegúrate de que la ruta es correcta

export default function GraficoDashboard({ expenses, presupuestoMax }) {
  // Crear una referencia para la imagen
  const imageRef = useRef(null);

  useEffect(() => {
    // Cargar la imagen solo una vez
    const image = new Image();
    image.src = "/dollar.png"; // Reemplaza con la ruta a tu icono
    image.onload = () => {
      imageRef.current = image;
    };
  }, []);

  // Extraer nombres y cantidades para el gráfico
  const labels = expenses.map((expense) => expense.descripcion);
  const dataValues = expenses.map((expense) => expense.importe);
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.importe, 0);

  const percentage = (totalAmount / presupuestoMax) * 100;
  let amountColor;

  if (percentage < 75) {
    amountColor = "text-green-500"; // Menos del 75% del presupuesto
  } else if (percentage >= 75 && percentage < 90) {
    amountColor = "text-yellow-500"; // Entre el 75% y el 90% del presupuesto
  } else if (percentage >= 90 && percentage <= 100) {
    amountColor = "text-orange-500"; // Entre el 90% y el 100% del presupuesto
  } else {
    amountColor = "text-red-500"; // Más del 100% del presupuesto
  }

  const formattedTotalAmount = totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedPresupuestoMax = presupuestoMax.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#1e3a8a",
          "#3b82f6",
          "#60a5fa",
          "#93c5fd",
          "#bfdbfe",
          "#1d4ed8",
          "#2563eb",
          "#3b82f6",
          "#60a5fa",
          "#93c5fd",
          "#dbeafe",
        ], // Más colores azulados
        hoverBackgroundColor: [
          "#1e3a8acc",
          "#3b82f6cc",
          "#60a5facc",
          "#93c5fdcc",
          "#bfdbfecc",
          "#1d4ed8cc",
          "#2563ebcc",
          "#3b82f6cc",
          "#60a5facc",
          "#93c5fdcc",
          "#dbeafecc",
        ], // Más colores azulados con opacidad
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();

      // Dibuja la imagen cuando esté cargada
      if (imageRef.current) {
        const image = imageRef.current;
        const size = Math.min(width, height)/2; // Ajustar el tamaño de la imagen en función del tamaño del gráfico
        const imageX = width / 2 - size / 2;
        const imageY = height / 2 - size / 2;
        ctx.drawImage(image, imageX, imageY, size, size); // Dibuja la imagen ajustada
      }

      ctx.save();
    },
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderColor: "#FFF",
        borderWidth: 1,
      },
    },
    layout: {
      padding: 5,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="bg-white border border-gray-300 shadow-lg p-6 rounded-lg flex flex-col w-full max-w-4xl mx-auto min-h-400 overflow-hidden" style={{height: 298}}>
      <h1 className="text-2xl font-semibold text-black mb-4">Gastos</h1>
      <div className="flex flex-col lg:flex-row items-start h-full">
        <div className="flex-grow h-full relative hidden lg:block">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:ml-6">
          <p className="text-lg lg:text-4xl font-semibold mb-4 text-center lg:text-left flex flex-wrap justify-center lg:justify-start">
            <span className={`${amountColor} text-lg lg:text-4xl`}>${formattedTotalAmount}</span>{" "}
            <span className="text-black text-lg lg:text-4xl"> / ${formattedPresupuestoMax}</span>
          </p>
          <ul className="mt-2 space-y-2 hidden lg:block">
            {expenses.slice(0, 5).map((expense, index) => (
              <li key={index} className="flex items-center justify-between">
                <span
                  className="inline-block w-4 h-4 mr-2 rounded-full"
                  style={{
                    backgroundColor: [
                      "#1e3a8a",
                      "#3b82f6",
                      "#60a5fa",
                      "#93c5fd",
                      "#bfdbfe",
                      "#1d4ed8",
                      "#2563eb",
                      "#3b82f6",
                      "#60a5fa",
                      "#93c5fd",
                      "#dbeafe",
                    ][index % 11],
                  }}
                ></span>
                <span className="text-sm lg:text-md font-medium text-black">
                  {expense.descripcion}
                </span>
                <span className="ml-auto text-sm lg:text-md text-black">
                  ${expense.importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
