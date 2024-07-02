import { Line } from 'react-chartjs-2';
import { useFilter } from '../../hooks/useFilter';
import { useEffect, useState } from 'react';
import { label } from 'three/examples/jsm/nodes/Nodes.js';

const LawCurve = () => {
  const { scenarioData } = useFilter();

  let block = 0;
  scenarioData.map((item) => {
    block += parseFloat(item[4]);
  });

  console.log(block);

  // useEffect(() => {
  //   setUplData(createSurfaceWithHoles(scenarioData));
  // }, []);

  // const { scenarioData } = useFilter();
  let Tonelaje = [];
  let oreAcumulado = [];
  let oreMedia = [];
  let orePorLey = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let oreley = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let blockPorLey = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let blockSuma = 0;
  let oreSuma = 0;
  console.log('UPLD AAAAAAAAA');

  scenarioData.map((item) => {
    blockSuma = blockSuma + parseFloat(item[3]);
    oreSuma = oreSuma + parseFloat(item[4]);
    let ley = parseFloat(item[4]) / parseFloat(item[3]);
    ley = ley.toFixed(1);
    orePorLey[ley * 10] += item[4];
    blockPorLey[ley * 10] += item[3];
    oreley[ley * 10] += parseFloat(ley);
  });

  let oreSumaAux = oreSuma;
  orePorLey.map((item) => {
    oreAcumulado.push(oreSumaAux / 1000 / 1000);
    oreSumaAux = oreSumaAux - item;
  });

  let blockSumaAux = blockSuma;
  blockPorLey.map((item) => {
    Tonelaje.push(blockSumaAux);
    blockSumaAux = blockSumaAux - item;
  });

  let sum = 0;
  orePorLey.map((item, index) => {
    oreMedia.push(sum);
    sum += item / blockPorLey[index];
    console.log(sum);
    // console.log(ley);
    // oreAcumulado.push(ley);
  });

  console.log(oreMedia);

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
  // uplData.map((item) => {
  //   const block = (item[3] = parseFloat(item[3]));
  //   let ore = 0;

  //   if (parseFloat(item[4]) > 0) {
  //     ore = parseFloat(item[4]);
  //     const Itemlaw = (ore / block).toFixed(1);
  //     laws[parseInt(Itemlaw * 10)]++;
  //     tonn[parseInt(Itemlaw * 10)] += block;
  //   }
  // });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tonleaje',
        data: oreAcumulado,
        fill: false,
        backgroundColor: 'rgb(0, 136, 204)',
        borderColor: 'rgb(0, 136, 204)',
        tension: 0.1,
      },
      {
        label: 'ley media',
        data: oreMedia,
        fill: false,
        backgroundColor: 'rgb(102, 204, 255)',
        borderColor: 'rgb(102, 204, 255)',
        tension: 0.1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ley de corte (%)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Tonelaje (Mt)',
        },
      },
      y1: {
        // Segundo eje Y para el gráfico de línea
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Ley media',
        },
        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };

  return (
    <div style={{ height: 400, marginBottom: 80, width: 600 }}>
      <h2>Curva tonelaje - ley</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LawCurve;
