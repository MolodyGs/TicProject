import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter {
  constructor() {}

  // Si filterType = -1, entonces es que no se requiere ningún filtro.
  async loadFilter(txt, period, filterType) {
    if (txt === "MinePlan.txt") {
      return await this.loadMinePlan(txt);
    } else {
      return await this.loadScenario(txt, period, filterType);
    }
  }

  async loadMinePlan(txt) {
    const response = await fetch(`/MinePlan.txt`);
    const text = await response.text();

    const lines = text.split('\n');
    return lines.map(line => {
      const [period, xIndex, yIndex, zIndex] = line.split(',').map(value => parseInt(value, 10));
      return [period, xIndex, yIndex, zIndex];
    });
  }

  
  async loadScenario(txt, period, filterType) {
    // Obtenemos los datos desde MinePlan para ser filtrados
    const filteredData = await minePlan.loadPeriod(txt, period);

    // ...
    // Lógica para el filtro de datos
    // ...

    return filteredData;
  }
}
