export class Data {
  constructor() {
    // No es necesario inicializar data aquí
  }

  async loadScenario(txt) {
    return this.loadData(txt);
  }

  async loadMinePlan() {
    return this.loadData('MinePlan.txt');
  }

  async loadData(txt) {
    let data = [];
    try {
      const response = await fetch("src/assets/" + txt);
      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }
      const textData = await response.text();
      console.log("Cargando datos...");
      data = this.parseData(textData);
      console.log("Se han cargado " + data.length + " datos");
      console.log(data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
    }
    return data;
  }

  parseData(textData) {
    let data = [];
    let rows = textData.split('\n');
    for (let i = 0; i < rows.length; i++) {
      let elements = rows[i].split(',');
      let cube = elements.map(parseFloat);
      data.push(cube);
    }
    return data;
  }
}
