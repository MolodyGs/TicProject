import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter{
  constructor() {
    
  }

  //Si filterType = -1, entonces es que no se requiere ningún filtro.
  async loadFilter( txt, period, filterType){
    
    //Obtenemos los datos desde MinePlan para ser filtrados
    const {periodData, sceneData} = await minePlan.loadPeriod(txt);

    let periods = [];

    //Añadir al array periods cuantos periodos distintos existen en el array periodData

    let initialPeriod = null;

    periodData.forEach(line => {
      if(line.periodo != initialPeriod){
        initialPeriod = line.periodo;
        periods.push(initialPeriod);

      }
    });
    
    return {sceneData, periods};
  }
}