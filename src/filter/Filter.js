import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter{
  constructor() {
    
  }

  //Si filterType = -1, entonces es que no se requiere ningún filtro.
  loadFilter( txt, period, filterType){
    
    //...
    //Lógica para el filtro de datos
    //...
    
    return minePlan.loadPeriod(txt, period);
  }
}