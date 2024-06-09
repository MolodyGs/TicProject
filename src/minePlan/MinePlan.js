import { Data } from '../data/Data.js';

let data = new Data();

export class MinePlan{
  constructor() {
    
  }

  //Si period = -1, entonces es que no se requiere ningún periodo.
  async loadPeriod(txt){
    
    //Obtenemos los datos desde Data para poder pasar por el periodo
    const sceneData = await data.load(txt);
    const periodData = data.minePlanData;

    //...
    //Lógica para cargar periodo
    //...

    return {periodData, sceneData};
  }
}