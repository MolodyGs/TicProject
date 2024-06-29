
let data = [];

export class Data{

  minePlanData = null;

  constructor() {
    data = [];

    (async () => {
      this.minePlanData = await this.readMinePlan();
    })();


  }

  //Carga los datos de un txt en particular
  async load(txt){
    data = [];
    if(txt == null || txt == ""){
      txt = 'Scenario00.txt';
    }
    await fetch("src/assets/" + txt)
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

  async readMinePlan(){
    //Leer archivo MinePlan.txt
    //period,X,Y,Z

  
    const res = await fetch("src/assets/MinePlan.txt" );

    const textData = await res.text();

    let minePlan = [];
    textData.split('\n').forEach(line => {
      if(line !== ""){
        const [periodo, x, y, z] = line.split(',').map(Number);
        minePlan.push({periodo, x, y, z});
      }
    });

    return minePlan;
  }
}