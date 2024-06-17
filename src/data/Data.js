export class Data {
  constructor() {
    this.minePlanData = []; // Guardar los datos del plan minero aquí
  }

  async loadScenario(txt, minePlanData = []) {
    return this.loadData(txt, minePlanData); // Pasar minePlanData para filtrar
  }

  async loadMinePlan() {
    this.minePlanData = await this.loadData('MinePlan.txt'); // Guardar los datos del plan minero
    return this.minePlanData;
  }

  async loadData(txt, minePlanData = []) {
    let data = [];
    try {
      const response = await fetch("src/assets/" + txt);
      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }
      const textData = await response.text();
      console.log("Cargando datos...");
      if (txt === 'MinePlan.txt') {
        data = this.parseMinePlanData(textData);
      } else {
        data = this.parseData(textData, minePlanData); // Pasar minePlanData para filtrar
      }
      console.log("Se han cargado " + data.length + " datos");
      console.log(data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
    return data;
  }

  parseData(textData, minePlanData) {
    let data = [];
    let rows = textData.split('\n');
    for (let i = 0; i < rows.length; i++) {
      let elements = rows[i].split(',');
      let cube = elements.map(parseFloat);
      if (!this.checkCoordinatesMatch(cube, minePlanData)) {
        data.push(cube); // Añadir al array si no coincide con el plan minero
      }
    }
    return data;
  }

  checkCoordinatesMatch(cube, minePlanData) {
    for (let i = 0; i < minePlanData.length; i++) {
      const { x, y, z } = minePlanData[i];
      if (cube[0] === x && cube[1] === y && cube[2] === z) {
        return true; // Coincide con las coordenadas del plan minero
      }
    }
    return false; // No coincide con ninguna coordenada del plan minero
  }

  parseMinePlanData(textData) {
    let data = [];
    let rows = textData.split('\n');
    for (let i = 0; i < rows.length; i++) {
      let elements = rows[i].split(',');
      if (elements.length === 4) {
        const [period, x, y, z] = elements.map(e => parseFloat(e));
        if (!isNaN(period) && !isNaN(x) && !isNaN(y) && !isNaN(z)) {
          data.push({ period, x, y, z });
        }
      }
    }
    return data;
  }
}
