import { Data } from '../data/Data.js';

let data = new Data();

export class MinePlan {
  constructor() {
    this.selectedPeriod = -1;
  }

  async loadPeriod(txt, period) {
    this.selectedPeriod = period;
    await data.loadMinePlan(); // Cargar datos del plan minero

    const filteredMinePlanData = this.filterMinePlanDataByPeriod(data.minePlanData, period); // Filtrar coordenadas de todos los periodos hasta el seleccionado

    const scenarioData = await data.loadScenario(txt, filteredMinePlanData); // Pasar datos filtrados al cargar el escenario

    return scenarioData; // Retornar datos del escenario filtrados
  }

  filterMinePlanDataByPeriod(minePlanData, period) {
    return minePlanData.filter(d => d.period <= period); // Filtrar coordenadas hasta el periodo seleccionado
  }
}
