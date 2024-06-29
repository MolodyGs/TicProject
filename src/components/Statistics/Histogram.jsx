import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Esto asegura que todos los elementos de Chart.js están disponibles
import { useAppState } from '../../context/FilterContext';


const Histogram = ({ data }) => {

    const { law, metalType } = useAppState();

    let finalColor = metalType === "oro" ? "#ffd700" : "#c0c0c0";

  const chartData = {
    labels: data.map(item => item.tipoRoca),
    datasets: [
      {
        label: 'Ley',
        data: data.map(item => item.ley),
        backgroundColor: finalColor,
        borderColor: finalColor,
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
          text: 'Tipo de Metal',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ley (%)',
        },
      },
    },
  };

  return (
    <div style={{height: "100vh"}}>
          <h2>Histograma Ley - Tipo de metal</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Histogram;
