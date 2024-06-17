import { Data } from '../data/Data.js';

let data = new Data();

export class MinePlan {
  constructor() {
    
  }

  // Si period = -1, carga solo el escenario; si period = 0, carga el MinePlan periodo 0
  async loadPeriod(txt, period) {
    if (period === -1) {
      // Cargar escenario
      return data.loadScenario(txt);
    } else if (period != -1) {
      // Cargar MinePlan
      const minePlanData = await data.loadMinePlan();
      // Aquí puedes implementar la lógica específica para el periodo 0 del MinePlan si es necesario
      return minePlanData;
    } else {
      throw new Error(`El periodo ${period} no está soportado.`);
    }
  }
}
