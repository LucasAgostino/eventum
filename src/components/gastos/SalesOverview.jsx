import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import "./chartSetup"; // Asegúrate de que la ruta es correcta

export default function SalesOverview({ expenses }) {
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
  const totalAmount = expenses
    .reduce((sum, expense) => sum + expense.importe, 0)
    .toFixed(2); // Total amount spent

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
        const imageX = width / 2 - image.width / 8; // Ajusta el tamaño según sea necesario
        const imageY = height / 2 - image.height / 8; // Ajusta el tamaño según sea necesario
        ctx.drawImage(image, imageX, imageY, image.width / 4, image.height / 4); // Dibuja la imagen a un tamaño menor
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
    <div className="bg-white border shadow-lg p-6 rounded-lg flex flex-col w-full max-w-4xl h-[435px]">
      <h1 className="text-2xl font-semibold text-black mb-4">Gastos</h1>
      <div className="flex flex-row items-start h-full">
        <div className="flex-grow h-full relative">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center ml-6">
          <p className="text-4xl font-semibold text-black mb-4">
            ${totalAmount}
          </p>
          <ul className="mt-2 space-y-2">
            {expenses.slice(0, 5).map((expense, index) => (
              <li key={index} className="flex items-center">
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
                <span className="text-md font-medium text-black">
                  {expense.descripcion}
                </span>
                <span className="ml-auto text-md text-black">
                  ${expense.importe.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
