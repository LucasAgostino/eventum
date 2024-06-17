import { Doughnut } from 'react-chartjs-2';
import './chartSetup'; // Asegúrate de que la ruta es correcta

export default function SalesOverview() {
  // Datos de la tabla de gastos
  const expenses = [
    { name: 'Alquiler del local', amount: 2500, category: 'Venue' },
    { name: 'Catering', amount: 3800, category: 'Food' },
    { name: 'Decoración', amount: 1200, category: 'Decor' },
    { name: 'Música', amount: 800, category: 'Entertainment' },
    { name: 'Fotografía', amount: 1500, category: 'Photography' },
  ];

  // Extraer nombres y cantidades para el gráfico
  const labels = expenses.map(expense => expense.name);
  const dataValues = expenses.map(expense => expense.amount);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'], // Colores azulados
        hoverBackgroundColor: ['#1e3a8acc', '#3b82f6cc', '#60a5facc', '#93c5fdcc', '#bfdbfecc'], // Colores azulados con opacidad
        borderWidth: 2,
      },
    ],
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';

      const text = "14,061", // Total sales value
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderColor: '#FFF',
        borderWidth: 1
      }
    },
    layout: {
      padding: 5
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="bg-white/15 backdrop-blur-sm border border-gray-300 shadow-lg p-4 rounded-lg ml-4 h-[400px] w-[700px] flex flex-col flex-1"> {/* Ajusta el tamaño aquí */}
      <h1 className="text-2xl font-semibold text-white">Gastos</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 h-full"> {/* Ajusta el tamaño aquí */}
          <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col justify-center">
          <p className="text-3xl font-semibold text-white mt-4">$56,734.36</p>
          <p className="text-green-500 text-xl mt-2">+12.76%</p>
          <ul className="mt-8">
            {expenses.map((expense, index) => (
              <li key={index} className="flex items-center m-2">
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'][index % 5] }}
                ></span>
                <span className="text-sm font-medium text-white">{expense.name}</span>
                <span className="ml-auto text-sm text-white ">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
