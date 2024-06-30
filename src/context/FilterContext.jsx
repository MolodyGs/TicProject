import { createContext, useContext, useState, useMemo } from 'react';
import {
  DEFAULT_ACTIVE_PAGE,
  DEFAULT_LAW_RANGE,
  DEFAULT_METAL_TYPE,
  DEFAULT_PERIOD,
  DEFAULT_ROCK_TYPE,
  DEFAULT_SCENARIO,
} from '../utils/constants';

// Creamos el contexto
const AppStateContext = createContext();

// Hook personalizado para usar el contexto
export const useAppState = () => {
  return useContext(AppStateContext);
};

// Proveedor del contexto
export const AppStateProvider = ({ children }) => {
  const [minePlanData, setMinePlanData] = useState([]);
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const [scenarioData, setScenarioData] = useState([]);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [lawRange, setLawRange] = useState(DEFAULT_LAW_RANGE);
  const [rockType, setRockType] = useState(DEFAULT_ROCK_TYPE);
  const [metalType, setMetalType] = useState(DEFAULT_METAL_TYPE);
  const [upl, setUpl] = useState(null);
  const [extractionCost, setExtractionCost] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [activePage, setActivePage] = useState(DEFAULT_ACTIVE_PAGE);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState('');
  const [law, setLaw] = useState(0);

  const state = useMemo(
    () => ({
      minePlanData,
      setMinePlanData,
      scenario,
      setScenario,
      scenarioData,
      setScenarioData,
      period,
      setPeriod,
      lawRange,
      setLawRange,
      rockType,
      setRockType,
      metalType,
      setMetalType,
      upl,
      setUpl,
      extractionCost,
      setExtractionCost,
      totalValue,
      setTotalValue,
      activePage,
      setActivePage,
      loading,
      setLoading,
      info,
      setInfo,
      law,
      setLaw,
    }),
    [
      minePlanData,
      scenario,
      scenarioData,
      period,
      lawRange,
      rockType,
      metalType,
      upl,
      extractionCost,
      totalValue,
      activePage,
      loading,
      info,
      law,
    ],
  );

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
