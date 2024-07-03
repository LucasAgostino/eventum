import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import "./chartSetup"; // Asegúrate de que la ruta es correcta

export default function SalesOverview({ expenses, presupuestoMax }) {
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
  } else if (percentage >= 90 && percentage < 100) {
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
          "#473ED7", // violeta
          "#322C99", // violoscuro
          "#7F6EFF", // un tono más claro de violeta
          "#4A41FF", // un tono más brillante de violeta
          "#B5A8FF", // un tono pastel de violeta
          "#6E5AFF", // un tono medio de violeta
          "#5543CC", // un tono más oscuro y profundo de violeta
          "#A89EFF", // un tono suave de violeta
          "#3D34B2", // un tono oscuro y vibrante
          "#8672FF", // un tono brillante y claro de violeta
          "#31299D"  // un tono muy oscuro de violeta
        ],
        hoverBackgroundColor: [
          "#473ED7CC",
          "#322C99CC",
          "#7F6EFFCC",
          "#4A41FFCC",
          "#B5A8FFCC",
          "#6E5AFFCC",
          "#5543CCCC",
          "#A89EFFCC",
          "#3D34B2CC",
          "#8672FFCC",
          "#31299DCC"
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
    <div className="bg-white border shadow-lg p-6 rounded-lg flex flex-col w-full max-w-4xl mx-auto min-h-400 overflow-hidden">
      <h1 className="text-2xl font-semibold text-black mb-4">Gastos</h1>
      <div className="flex flex-col lg:flex-row items-start h-full">
        <div className="flex-grow h-full relative lg:block">
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
                      "#473ED7", // violeta
                      "#322C99", // violoscuro
                      "#7F6EFF", // un tono más claro de violeta
                      "#4A41FF", // un tono más brillante de violeta
                      "#B5A8FF", // un tono pastel de violeta
                      "#6E5AFF", // un tono medio de violeta
                      "#5543CC", // un tono más oscuro y profundo de violeta
                      "#A89EFF", // un tono suave de violeta
                      "#3D34B2", // un tono oscuro y vibrante
                      "#8672FF", // un tono brillante y claro de violeta
                      "#31299D"  // un tono muy oscuro de violeta
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
