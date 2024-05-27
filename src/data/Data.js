
let data = [];
export class Data{
  constructor() {
    data = [];
  }

  async load(txt){
    data = [];
    if(txt == null || txt == ""){
      txt = 'Scenario00.txt';
    }
    await fetch(txt)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }
      return response.text();
    })
    .then(textData => {
      console.log("Cargando datos...");
      let cube = []; 
      data = [];
      textData.split('\n').forEach(line => {
        line.split(',').forEach(element => {
          cube.push(parseFloat(element));
        });
        if(cube.length == 6){
          data.push(cube);
          cube = []; 
        }
      });
      console.log("Se han cargado " + data.length + " datos");
      console.log(data);
    })
    .catch(error => {
      console.error('Error al cargar el archivo:', error);
    });

    return data;
  }

}