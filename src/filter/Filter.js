import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter{
  constructor() {
    
  }

  loadFilter( txt, period, filterType){
    
    //Lógica para el filtro de datos
    const data = minePlan.loadPeriod(txt, period);
    console.log(data);
    return data;
  }
}