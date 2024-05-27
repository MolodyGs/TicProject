import { Data } from '../data/Data.js';

let data = new Data();

export class MinePlan{
  constructor() {
    
  }

  async loadPeriod(txt, period){
    
    //Lógica para cargar periodo
    const cubesData = await data.load(txt);
    return cubesData;
  }
}