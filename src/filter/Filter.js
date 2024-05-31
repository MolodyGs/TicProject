import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter {
  constructor() {}

  // Si filterType = -1, entonces es que no se requiere ningún filtro.
  async loadFilter(txt, period, filterType) {
    if (txt === "MinePlan.txt") {
      return await this.loadMinePlan(txt, period);
    } else {
      return await this.loadScenario(txt);
    }
  }

  async loadMinePlan(txt, period) {
    const response = await fetch(`/MinePlan.txt`);
    const text = await response.text();

    const lines = text.split('\n');
    let data = lines.map(line => {
      const [period, xIndex, yIndex, zIndex] = line.split(',').map(value => parseInt(value, 10));
      return { period, xIndex, yIndex, zIndex };
    });

    // Filtrar los bloques según el período
    if (period >= 0 && period <= 5) {
      data = data.filter(block => block.period === period);
    }

    return data;
  }


  async loadScenario(txt) {
    // Obtenemos los datos desde MinePlan para ser filtrados
    const filteredData = await minePlan.loadPeriod(txt, -1);

    // ...
    // Lógica para el filtro de datos
    // ...

    return filteredData;
  }
}
