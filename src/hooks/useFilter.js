import { useCallback, useEffect, useState } from 'react';
import { useAppState } from '../context/FilterContext';
import { loadScenario, loadMinePlan } from '../helpers/loadData';
import { MINERAL_PRICE, VALID_RANGES } from '../utils/constants';
import { calculateUpl } from '../helpers/statistics';

export const useFilter = () => {
  const {
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
    transversalX,
    setTransversalX,
    transversalY,
    setTransversalY,
    transversalZ,
    setTransversalZ,
    useTransversal,
    setUseTransversal,
  } = useAppState();

  const [filtersApplied, setFiltersApplied] = useState(true);

  const filterData = useCallback(async () => {
    if (!filtersApplied) return;
    try {
      setLoading(true);
      const minePlanData = await loadMinePlan();
      const periodData = await loadScenario(scenario);

      // Filtrar por ley
      const filteredByLaw = periodData.filter((cube) => {
        const law = ((cube[4] + cube[5]) / cube[3]) * 100;
        return law >= lawRange[0] && law <= lawRange[1];
      });

      // Filtrar por tipo de roca
      const filteredByRock = filteredByLaw.filter((cube) => {
        const [xIndex, , zIndex] = cube;
        let typeOfBlock = 'A';
        if (
          VALID_RANGES[zIndex]?.some(
            ([start, end]) => xIndex >= start && xIndex <= end,
          )
        ) {
          typeOfBlock = 'B';
        }

        return rockType === 'todos' || rockType === typeOfBlock;
      });

      // Filtrar por tipo de metal TODO: REVISAR
      //const filteredByMetal = filteredByRock.filter((cube) => {
      //  if (metalType === 'oro' && cube[4] > 0) return true;
      //  else if (metalType === 'plata' && cube[5] > 0) return true;
      //  return true;
      //});

      // Filtrar por periodo
      const filteredByPeriod = filteredByRock.filter((cube) => {
        const [x, y, z] = cube;

        return !minePlanData.some((minePlanEntry) => {
          const [minedPeriod, minedX, minedY, minedZ] = minePlanEntry;
          return (
            minedPeriod <= period &&
            minedX === x &&
            minedY === y &&
            minedZ === z
          );
        });
      });

      // Filtrar por seccion transversal
      let filteredByTransversal;
      if (useTransversal) {
        filteredByTransversal = filteredByPeriod.filter((cube) => {
          const [x, y, z] = cube;
          return (
            x >= transversalX[0] &&
            x <= transversalX[1] &&
            y >= transversalY[0] &&
            y <= transversalY[1] &&
            z >= transversalZ[0] &&
            z <= transversalZ[1]
          );
        });
      } else {
        filteredByTransversal = filteredByPeriod;
      }

      let medianLaw = 0;
      let totalBlocks = 0;
      // Calcular costos de extracción y valor total
      const updatedFilteredData = filteredByTransversal.map((cube) => {
        const law = ((cube[4] + cube[5]) / cube[3]) * 100;
        medianLaw += law;
        totalBlocks += 1;
        const cost = law * MINERAL_PRICE * upl - extractionCost;
        return [...cube, cost];
      });

      setLaw(Math.floor(medianLaw / totalBlocks));

      setScenarioData(updatedFilteredData);

      if (activePage === 'upl') {
        const { uplValue, totalExtractionCost, totalValue } =
          calculateUpl(scenarioData);
        setUpl(uplValue);
        setExtractionCost(totalExtractionCost);
        setTotalValue(totalValue);
      }
    } catch (error) {
      console.error('Error filtering data:', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scenario,
    period,
    lawRange,
    metalType,
    rockType,
    upl,
    extractionCost,
    minePlanData,
    activePage,
    setActivePage,
    filtersApplied,
  ]);

  useEffect(() => {
    filterData();
    setFiltersApplied(false);
  }, [filterData]);

  const applyFilters = () => {
    setFiltersApplied(true);
  };

  return {
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
    transversalX,
    setTransversalX,
    transversalY,
    setTransversalY,
    transversalZ,
    setTransversalZ,
    useTransversal,
    setUseTransversal,
    applyFilters,
  };
};
