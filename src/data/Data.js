
let data;


export class Data{
  constructor() {
    data = [];
  }

  getData(){
    return data;
  }

  load(txt){

    if(txt == null){
      txt = 'Scenario00.txt';
    }
    fetch(txt)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }
      return response.text();
    })
    .then(textData => {
      console.log("Cargando datos...");
      let cube = []; 
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
      return data;
    })
    .catch(error => {
      console.error('Error al cargar el archivo:', error);
    });
  }

}