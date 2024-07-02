import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Esto asegura que todos los elementos de Chart.js están disponibles
import { useFilter } from '../../hooks/useFilter';

const Histogram = () => {
  const { scenarioData } = useFilter();

  const lawsTypeA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const lawsTypeB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const labels = [
    '< 0.1',
    '0.1',
    '0.2',
    '0.3',
    '0.4',
    '0.5',
    '0.6',
    '0.7',
    '0.8',
    '0.9',
    '1.0',
  ];
  scenarioData.map((item) => {
    const block = (item[3] = parseFloat(item[3]));
    let ore = 0;

    if (parseFloat(item[4]) > 0) {
      ore = parseFloat(item[4]);
      const Itemlaw = (ore / block).toFixed(1);
      lawsTypeA[parseInt(Itemlaw * 10)]++;
    } else if (parseFloat(item[5]) > 0) {
      ore = parseFloat(item[5]);
      const Itemlaw = (ore / block).toFixed(1);
      lawsTypeB[parseInt(Itemlaw * 10)]++;
    }
  });

  const chartDataTypeA = {
    labels: labels,
    datasets: [
      {
        label: 'Ley Metal 1',
        data: lawsTypeA,
        backgroundColor: 'rgb(254, 219, 124)',
        borderWidth: 1,
      },
      {
        label: 'Ley Metal 2',
        data: lawsTypeB,
        backgroundColor: 'rgb(222, 222, 222)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ley (%)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia',
        },
      },
    },
  };

  return (
    <div style={{ height: 400, marginBottom: 0, width: 600 }}>
      <h2 style={{ borderTop: 50 }}>Histograma Ley - Tipo de metal</h2>
      <Bar data={chartDataTypeA} options={options} />
    </div>
  );
};

export default Histogram;
