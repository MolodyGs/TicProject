import React from 'react';
import { useFilter } from '../../hooks/useFilter';

function Filters() {
  const {
    scenario,
    setScenario,
    lawRange,
    setLawRange,
    rockType,
    setRockType,
    metalType,
    setMetalType,
  } = useFilter();

  const onScenarioChange = (event) => {
    setScenario(event.target.value);
  };

  const onLawRangeChange = (range) => {
    if (range[1] < range[0]) setLawRange([range[0], range[0]]);
    else setLawRange(range);
  };

  const onRockTypeChange = (event) => {
    setRockType(event.target.value);
  };

  const onMetalTypeChange = (event) => {
    setMetalType(event.target.value);
  };
  return (
    <div>
      <h4 className="text-center">Filtros</h4>
      <p>Cargar datos de: </p>
      <select
        className="form-control"
        value={scenario}
        onChange={onScenarioChange}
      >
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
        <p>
          Filtrar por ley: {lawRange[0]} - {lawRange[1]}
        </p>
        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={lawRange[0]}
          onChange={(event) =>
            onLawRangeChange([+event.target.value, lawRange[1]])
          }
        />
        <input
          type="range"
          className="form-range"
          min="0"
          max="100"
          value={lawRange[1]}
          onChange={(event) =>
            onLawRangeChange([lawRange[0], +event.target.value])
          }
        />
      </div>
      <div className="my-3">
        <p>Filtrar por tipo de roca:</p>
        <select
          className="form-control"
          value={rockType}
          onChange={onRockTypeChange}
        >
          <option value="todos">Todos</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div className="my-3">
        <p>Filtrar por tipo de metal:</p>
        <select
          className="form-control"
          value={metalType}
          onChange={onMetalTypeChange}
        >
          <option value="todos">Todos</option>
          <option value="oro">Oro</option>
          <option value="plata">Plata</option>
        </select>
      </div>
    </div>
  );
}

export default React.memo(Filters);
