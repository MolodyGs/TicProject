import { useState, useEffect } from 'react'
import { Visualization } from './visualization/Visualization.js'
import './App.css'
import { Filter } from './filter/Filter'

function App() {
  const [data, setData] = useState([]);
  const [scenario, setScenario] = useState("Scenario00.txt");
  const [period, setPeriod] = useState(-1);
  const [lawRange, setLawRange] = useState([0, 100]);  // Range slider values
  const [rockType, setRockType] = useState("todos");
  const [metalType, setMetalType] = useState("todos");

  const visualization = new Visualization();

  const loadData = async () => {
    try {
      const filter = new Filter();
      const cubesData = await filter.loadFilter(scenario, period, lawRange, rockType, metalType);
      setData(cubesData);
      visualization.loadVisualization(cubesData);
      console.log("Se han cargado " + cubesData.length + " cubos");
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [scenario, period, lawRange, rockType, metalType]);

  return (
    <>
      <div>
        <p>Cargar datos de: </p>
        <select onChange={(event) => setScenario(event.target.value)}>
          <option value="Scenario00.txt">Scenario00.txt</option>
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
      </div>
    </>
  )
}

export default App
