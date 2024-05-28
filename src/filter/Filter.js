import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter{
  constructor() {
    
  }

  //Si filterType = -1, entonces es que no se requiere ningún filtro.
  async loadFilter( txt, period, filterType){
    
    //Obtenemos los datos desde MinePlan para ser filtrados
    const filtedData = await minePlan.loadPeriod(txt, period);

    //...
    //Lógica para el filtro de datos
    //...
    
    return filtedData;
  }
}