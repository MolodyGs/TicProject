import { Data } from '../data/Data.js';

let data = new Data();

export class MinePlan{
  constructor() {
    
  }

  //Si period = -1, entonces es que no se requiere ningún periodo.
  async loadPeriod(txt, period){
    
    //...
    //Lógica para cargar periodo
    //...

    return await data.load(txt);
  }
}