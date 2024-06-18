import { Doughnut } from 'react-chartjs-2';
import './chartSetup'; // Asegúrate de que la ruta es correcta

export default function SalesOverview({ expenses }) {
  // Extraer nombres y cantidades para el gráfico
  const labels = expenses.map(expense => expense.descripcion);
  const dataValues = expenses.map(expense => expense.importe);

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

      const totalAmount = expenses.reduce((sum, expense) => sum + expense.importe, 0).toFixed(2); // Total amount spent
      const text = `${totalAmount}`; // Convert to string
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

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
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col">
      <h1 className="text-2xl font-semibold text-black mb-4">Gastos</h1>
      <div className="flex flex-row items-start">
        <div className="flex-grow">
          <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
        </div>
        <div className="w-1/2 flex flex-col justify-center ml-6">
          <p className="text-4xl font-semibold text-black mb-4">${expenses.reduce((sum, expense) => sum + expense.importe, 0).toFixed(2)}</p>
          <ul className="mt-2 space-y-2">
            {expenses.map((expense, index) => (
              <li key={index} className="flex items-center">
                <span
                  className="inline-block w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'][index % 5] }}
                ></span>
                <span className="text-md font-medium text-black">{expense.descripcion}</span>
                <span className="ml-auto text-md text-black">${expense.importe.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
