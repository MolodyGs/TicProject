import { useState, useEffect } from 'react';
import { Visualization } from './visualization/Visualization';
import { UplVisualization } from './stadistics/UplVisualization';
import { Filter } from './filter/Filter';
import { calculateUpl } from './stadistics/Upl';

const MINERAL_PRICE = 50; // Precio del mineral por kilo
const EXTRACTION_COST_PER_BLOCK = 10000; // Costo de extracción por bloque

function App() {
  const [data, setData] = useState([]);
  const [scenario, setScenario] = useState("Scenario00.txt");
  const [period, setPeriod] = useState(-1);
  const [lawRange, setLawRange] = useState([0, 100]);
  const [rockType, setRockType] = useState("todos");
  const [metalType, setMetalType] = useState("todos");
  const [upl, setUpl] = useState(null);
  const [extractionCost, setExtractionCost] = useState(null);
  const [totalValue, setTotalValue] = useState(null);

  const visualization = new Visualization();
  const uplVisualization = new UplVisualization();

  const loadData = async () => {
    try {
      const filter = new Filter();
      const cubesData = await filter.loadFilter(scenario, period, lawRange, rockType, metalType);
      setData(cubesData);
      visualization.loadVisualization(cubesData);
      const { uplValue, totalExtractionCost, totalValue } = calculateUpl(cubesData, MINERAL_PRICE, EXTRACTION_COST_PER_BLOCK);
      setUpl(uplValue);
      setExtractionCost(totalExtractionCost);
      setTotalValue(totalValue);
      uplVisualization.loadVisualization(cubesData, uplValue);
      console.log("Se han cargado " + cubesData.length + " cubos");
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [scenario, period, lawRange, rockType, metalType]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '500px', padding: '10px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <p>Cargar datos de: </p>
        <select onChange={(event) => setScenario(event.target.value)}>
          <option value="Scenario00.txt">Scenario00.txt</option>
          <option value="Scenario01.txt">Scenario01.txt</option>
          <option value="Scenario02.txt">Scenario02.txt</option>
          <option value="Scenario03.txt">Scenario03.txt</option>
          <option value="Scenario04.txt">Scenario04.txt</option>
          <option value="Scenario05.txt">Scenario05.txt</option>
          <option value="Scenario06.txt">Scenario06.txt</option>
          <option value="Scenario07.txt">Scenario07.txt</option>
          <option value="Scenario08.txt">Scenario08.txt</option>
          <option value="Scenario09.txt">Scenario09.txt</option>
          {/* Add other scenarios here */}
        </select>
        <div>
          <p>Filtrar por ley: {lawRange[0]} - {lawRange[1]}</p>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={lawRange[0]} 
            onChange={(event) => setLawRange([+event.target.value, lawRange[1]])}
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={lawRange[1]} 
            onChange={(event) => setLawRange([lawRange[0], +event.target.value])}
          />
        </div>
        <div>
          <p>Filtrar por tipo de roca: </p>
          <select onChange={(event) => setRockType(event.target.value)}>
            <option value="todos">Todos</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div>
          <p>Filtrar por tipo de metal: </p>
          <select onChange={(event) => setMetalType(event.target.value)}>
            <option value="todos">Todos</option>
            <option value="oro">Oro</option>
            <option value="plata">Plata</option>
          </select>
        </div>
        <div>
          <p>Valor UPL: {upl !== null && typeof upl === 'number' ? `${upl.toFixed(2)} USD` : 'Cargando...'}</p>
          <p>Costo de Extracción: {extractionCost !== null && typeof extractionCost === 'number' ? `${extractionCost.toFixed(2)} USD` : 'Cargando...'}</p>
          <p>Valor Total del Mineral: {totalValue !== null && typeof totalValue === 'number' ? `${totalValue.toFixed(2)} USD` : 'Cargando...'}</p>
        </div>
        <div>
          <p>Precio del Mineral: {MINERAL_PRICE} USD x Kg</p>
          <p>Costo de Extracción por Bloque: {EXTRACTION_COST_PER_BLOCK} USD</p>
        </div>
        <div id="upl-visualization" style={{ width: '100%', height: '300px' }}></div>
      </div>
      <div id="3d-visualization" style={{ flex: 1, height: '100%' }}></div>
    </div>
  );
}

export default App;
