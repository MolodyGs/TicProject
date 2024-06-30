import React from 'react';
import { useFilter } from '../../hooks/useFilter';
import {
  METAL_TYPES,
  PERIODS,
  ROCK_TYPES,
  SCENARIOS,
} from '../../utils/constants';

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
    period,
    setPeriod,
    applyFilters,
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

  const onPeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div>
      <p>Cargar datos de: </p>
      <select
        className="form-control"
        value={scenario}
        onChange={onScenarioChange}
      >
        {SCENARIOS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
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
          {ROCK_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <p>Filtrar por tipo de metal:</p>
        <select
          className="form-control"
          value={metalType}
          onChange={onMetalTypeChange}
        >
          {METAL_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <p>Filtrar por periodo:</p>
        <select
          className="form-control"
          value={period}
          onChange={onPeriodChange}
        >
          {PERIODS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <button className="btn btn-primary" onClick={applyFilters}>
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}

export default React.memo(Filters);
