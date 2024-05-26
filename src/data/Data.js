
let data;


export class Data{
  constructor() {
    data = [];
  }

  getData(){
    return data;
  }

  load(txt){
    fetch(txt)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo');
      }
      return response.text();
    })
    .then(textData => {
      let cube = []; 
      textData.split('\n').forEach(line => {
        line.split(',').forEach(element => {
          cube.push(parseFloat(element));
        });
        data.push(cube);
        cube = []; 
      });
      return data;
    })
    .catch(error => {
      console.error('Error al cargar el archivo:', error);
    });
  }

}