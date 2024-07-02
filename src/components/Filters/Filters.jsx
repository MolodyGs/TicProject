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
    transversalX,
    setTransversalX,
    transversalY,
    setTransversalY,
    transversalZ,
    setTransversalZ,
    useTransversal,
    setUseTransversal,
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

  const onTransversalXChange = (range) => {
    setTransversalX(range);
  };

  const onTransversalYChange = (range) => {
    setTransversalY(range);
  };

  const onTransversalZChange = (range) => {
    setTransversalZ(range);
  };

  const onUseTransversalChange = (event) => {
    setUseTransversal(event.target.checked);
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
        <div className="my-3">
          <input
            type="checkbox"
            checked={useTransversal}
            onChange={onUseTransversalChange}
          />
          <label htmlFor="useTransversal"> Usar Filtro Transversal</label>
        </div>

        {useTransversal && (
          <>
            <div className="my-3">
              <p>
                Filtrar por X: {transversalX[0]} - {transversalX[1]}
              </p>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalX[0]}
                onChange={(event) =>
                  onTransversalXChange([+event.target.value, transversalX[1]])
                }
              />
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalX[1]}
                onChange={(event) =>
                  onTransversalXChange([transversalX[0], +event.target.value])
                }
              />
            </div>

            <div className="my-3">
              <p>
                Filtrar por Y: {transversalY[0]} - {transversalY[1]}
              </p>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalY[0]}
                onChange={(event) =>
                  onTransversalYChange([+event.target.value, transversalY[1]])
                }
              />
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalY[1]}
                onChange={(event) =>
                  onTransversalYChange([transversalY[0], +event.target.value])
                }
              />
            </div>

            <div className="my-3">
              {' '}
              <p>
                Filtrar por Z: {transversalZ[0]} - {transversalZ[1]}
              </p>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalZ[0]}
                onChange={(event) =>
                  onTransversalZChange([+event.target.value, transversalZ[1]])
                }
              />
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={transversalZ[1]}
                onChange={(event) =>
                  onTransversalZChange([transversalZ[0], +event.target.value])
                }
              />
            </div>
          </>
        )}
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
