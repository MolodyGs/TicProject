import React, { useState, useEffect } from 'react';
import { Visualization } from './visualization/Visualization';
import { UplVisualization } from './stadistics/UplVisualization';
import { Filter } from './filter/Filter';
import { calculateUpl } from './stadistics/Upl';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MINERAL_PRICE = 50;
const EXTRACTION_COST_PER_BLOCK = 10000;

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
  const [activePage, setActivePage] = useState("yacimiento");

  const visualization = new Visualization();
  const uplVisualization = new UplVisualization();

  const loadData = async () => {
    try {
      const filter = new Filter();
      const cubesData = await filter.loadFilter(scenario, period, lawRange, rockType, metalType);
      setData(cubesData);
      if (activePage === "yacimiento") {
        visualization.loadVisualization(cubesData);
      } else {
        const { uplValue, totalExtractionCost, totalValue } = calculateUpl(cubesData, MINERAL_PRICE, EXTRACTION_COST_PER_BLOCK);
        setUpl(uplValue);
        setExtractionCost(totalExtractionCost);
        setTotalValue(totalValue);
        uplVisualization.loadVisualization(cubesData, uplValue);
      }
      console.log("Se han cargado " + cubesData.length + " cubos");
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [scenario, period, lawRange, rockType, metalType, activePage]);

  return (
    <div className="d-flex">
      <div className="bg-light border-right" id="sidebar-wrapper" style={{ minWidth: '250px', fontFamily: 'Arial, sans-serif' }}>
        <div className="text-center mt-4">
          <img src="https://1000logos.net/wp-content/uploads/2020/07/BHP-Logo.png" alt="Logo Minero" style={{ width: '100px', height: '50px' }} />
        </div>
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold border-bottom">
          <span>Sistema Inteligente para Yacimientos Mineros</span>
        </div>
        <div className="list-group list-group-flush my-3">
          <a href="#!" className="list-group-item list-group-item-action bg-light text-primary d-flex align-items-center" onClick={() => setActivePage("yacimiento")}>
            <i className="fas fa-mountain mr-2"></i>
            <span> Yacimiento</span>
          </a>
          <a href="#!" className="list-group-item list-group-item-action bg-light text-primary d-flex align-items-center" onClick={() => setActivePage("upl")}>
            <i className="fas fa-gem mr-2"></i>
            <span> Ultimate Pit Limit</span>
          </a>
        </div>
      </div>
      <div className="container-fluid">
        {activePage === "yacimiento" && (
          <div className="row">
            <div className="col-4 mt-6">
              <h2>Filtros</h2>
              <p>Cargar datos de: </p>
              <select className="form-control" onChange={(event) => setScenario(event.target.value)}>
                <option value="Scenario00.txt">Escenario 0</option>
                <option value="Scenario01.txt">Escenario 1</option>
                <option value="Scenario02.txt">Escenario 2</option>
                <option value="Scenario03.txt">Escenario 3</option>
                <option value="Scenario04.txt">Escenario 4</option>
                <option value="Scenario05.txt">Escenario 5</option>
                <option value="Scenario06.txt">Escenario 6</option>
                <option value="Scenario07.txt">Escenario 7</option>
                <option value="Scenario08.txt">Escenario 8</option>
                <option value="Scenario09.txt">Escenario 9</option>
              </select>
              <div className="my-3">
                <p>Filtrar por ley: {lawRange[0]} - {lawRange[1]}</p>
                <input type="range" className="form-range" min="0" max="100" value={lawRange[0]} onChange={(event) => setLawRange([+event.target.value, lawRange[1]])} />
                <input type="range" className="form-range" min="0" max="100" value={lawRange[1]} onChange={(event) => setLawRange([lawRange[0], +event.target.value])} />
              </div>
              <div className="my-3">
                <p>Filtrar por tipo de roca: </p>
                <select className="form-control" onChange={(event) => setRockType(event.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="my-3">
                <p>Filtrar por tipo de metal: </p>
                <select className="form-control" onChange={(event) => setMetalType(event.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="oro">Oro</option>
                  <option value="plata">Plata</option>
                </select>
              </div>
            </div>
            <div className="col-8">
              <div id="3d-visualization" style={{ width: '100%', height: '100vh' }}></div>
            </div>
          </div>
        )}
        {activePage === "upl" && (
          <div className="row">
            <div className="col-4 mt-6">
              <h2>Filtros</h2>
              <p>Cargar datos de: </p>
              <select className="form-control" onChange={(event) => setScenario(event.target.value)}>
                <option value="Scenario00.txt">Escenario 0</option>
                <option value="Scenario01.txt">Escenario 1</option>
                <option value="Scenario02.txt">Escenario 2</option>
                <option value="Scenario03.txt">Escenario 3</option>
                <option value="Scenario04.txt">Escenario 4</option>
                <option value="Scenario05.txt">Escenario 5</option>
                <option value="Scenario06.txt">Escenario 6</option>
                <option value="Scenario07.txt">Escenario 7</option>
                <option value="Scenario08.txt">Escenario 8</option>
                <option value="Scenario09.txt">Escenario 9</option>
              </select>
              <div className="my-3">
                <p>Filtrar por ley: {lawRange[0]} - {lawRange[1]}</p>
                <input type="range" className="form-range" min="0" max="100" value={lawRange[0]} onChange={(event) => setLawRange([+event.target.value, lawRange[1]])} />
                <input type="range" className="form-range" min="0" max="100" value={lawRange[1]} onChange={(event) => setLawRange([lawRange[0], +event.target.value])} />
              </div>
              <div className="my-3">
                <p>Filtrar por tipo de roca: </p>
                <select className="form-control" onChange={(event) => setRockType(event.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="my-3">
                <p>Filtrar por tipo de metal: </p>
                <select className="form-control" onChange={(event) => setMetalType(event.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="oro">Oro</option>
                  <option value="plata">Plata</option>
                </select>
              </div>
            </div>
            <div className="col-8">
              <div id="3d-upl-visualization" style={{ width: '100%', height: '100vh' }}></div>
              {upl !== null && (
                <div>
                  <h3>Ultimate Pit Limit (UPL): {upl}</h3>
                  <h4>Total Extraction Cost: {extractionCost}</h4>
                  <h4>Total Value: {totalValue}</h4>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
