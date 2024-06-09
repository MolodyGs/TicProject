import { MinePlan } from "../minePlan/MinePlan.js";

let minePlan = new MinePlan();

export class Filter {
  constructor() { }

  async loadFilter(txt, period, lawRange, rockType, metalType) {
    // Obtener los datos del escenario según el periodo
    const periodData = await minePlan.loadPeriod(txt, period);

    // Filtrar por ley
    const filteredByLaw = periodData.filter(cube => {
      const law = ((cube[4] + cube[5]) / cube[3]) * 100;
      return law >= lawRange[0] && law <= lawRange[1];
    });

    // Filtrar por tipo de roca
    const filteredByRock = filteredByLaw.filter(cube => {
      const [xIndex, , zIndex] = cube;
      let typeOfBlock = 'A';
      // Condiciones dadas por el archivo RockTypes
      if (
        (zIndex == 1 && ((xIndex <= 2) || (xIndex >= 6 && xIndex <= 9) || (xIndex >= 13 && xIndex <= 14) || (xIndex >= 18 && xIndex <= 19) || (xIndex >= 23 && xIndex <= 25) || (xIndex >= 29 && xIndex <= 30) || (xIndex >= 35))) ||
        (zIndex == 2 && ((xIndex <= 2) || (xIndex >= 6 && xIndex <= 8) || (xIndex >= 13 && xIndex <= 14) || (xIndex >= 18 && xIndex <= 19) || (xIndex >= 23 && xIndex <= 24) || (xIndex >= 29 && xIndex <= 30) || (xIndex >= 34))) ||
        (zIndex == 3 && ((xIndex <= 1) || (xIndex >= 5 && xIndex <= 8) || (xIndex >= 12 && xIndex <= 14) || (xIndex >= 17 && xIndex <= 18) || (xIndex >= 22 && xIndex <= 23) || (xIndex >= 28 && xIndex <= 29) || (xIndex >= 35))) ||
        (zIndex == 4 && ((xIndex <= 1) || (xIndex >= 5 && xIndex <= 7) || (xIndex >= 12 && xIndex <= 13) || (xIndex >= 17 && xIndex <= 18) || (xIndex >= 22 && xIndex <= 23) || (xIndex >= 27 && xIndex <= 28) || (xIndex >= 35))) ||
        (zIndex == 5 && ((xIndex >= 5 && xIndex <= 7) || (xIndex >= 11 && xIndex <= 13) || (xIndex >= 17 && xIndex <= 18) || (xIndex >= 22 && xIndex <= 23) || (xIndex >= 27 && xIndex <= 28) || (xIndex == 32) || (xIndex >= 35))) ||
        (zIndex == 6 && ((xIndex >= 4 && xIndex <= 6) || (xIndex >= 11 && xIndex <= 13) || (xIndex == 17) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 27 && xIndex <= 28) || (xIndex == 32) || (xIndex >= 35))) ||
        (zIndex == 7 && ((xIndex >= 4 && xIndex <= 5) || (xIndex >= 11 && xIndex <= 13) || (xIndex >= 16 && xIndex <= 17) || (xIndex >= 20 && xIndex <= 22) || (xIndex >= 26 && xIndex <= 27) || (xIndex == 31) || (xIndex == 35))) ||
        (zIndex == 8 && ((xIndex == 1) || (xIndex >= 3 && xIndex <= 5) || (xIndex == 7) || (xIndex >= 11 && xIndex <= 12) || (xIndex == 16) || (xIndex >= 20 && xIndex <= 21) || (xIndex >= 26 && xIndex <= 27) || (xIndex == 31) || (xIndex >= 34 && xIndex <= 35))) ||
        (zIndex == 9 && ((xIndex <= 6) || (xIndex >= 10 && xIndex <= 16) || (xIndex >= 19 && xIndex <= 22) || (xIndex >= 26 && xIndex <= 28) || (xIndex == 31) || (xIndex >= 34 && xIndex <= 35))) ||
        (zIndex == 10 && ((xIndex <= 4) || (xIndex >= 9 && xIndex <= 14) || (xIndex == 18) || (xIndex >= 23 && xIndex <= 24) || (xIndex >= 30 && xIndex <= 31) || (xIndex >= 34 && xIndex <= 35))) ||
        (zIndex == 11 && ((xIndex >= 4 && xIndex <= 5) || (xIndex >= 9 && xIndex <= 12) || (xIndex >= 16 && xIndex <= 17) || (xIndex == 22) || (xIndex >= 31 && xIndex <= 32) || (xIndex == 34))) ||
        (zIndex == 12 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex >= 9 && xIndex <= 11) || (xIndex == 15) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 30 && xIndex <= 31) || (xIndex == 34))) ||
        (zIndex == 13 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 30 && xIndex <= 31) || (xIndex == 34))) ||
        (zIndex == 14 && ((xIndex == 4) || (xIndex >= 9 && xIndex <= 10) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 30 && xIndex <= 31) || (xIndex == 34))) ||
        (zIndex == 15 && ((xIndex == 1) || (xIndex == 4) || (xIndex == 9) || (xIndex == 15) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 30 && xIndex <= 31) || (xIndex == 34))) ||
        (zIndex == 16 && ((xIndex == 0) || (xIndex == 4) || (xIndex == 9) || (xIndex >= 14 && xIndex <= 15) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 29 && xIndex <= 31) || (xIndex == 34))) ||
        (zIndex == 17 && ((xIndex == 1) || (xIndex == 4) || (xIndex == 9) || (xIndex == 14) || (xIndex >= 21 && xIndex <= 22) || (xIndex >= 30 && xIndex <= 31) || (xIndex >= 34))) ||
        (zIndex == 18 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 13) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex >= 34))) ||
        (zIndex == 19 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 13) || (xIndex >= 22 && xIndex <= 23) || (xIndex == 30) || (xIndex == 34))) ||
        (zIndex == 20 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 13) || (xIndex == 22) || (xIndex == 30) || (xIndex >= 33 && xIndex <= 34))) ||
        (zIndex == 21 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 13) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex >= 33 && xIndex <= 34))) ||
        (zIndex == 22 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 12) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex == 33))) ||
        (zIndex == 23 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 24 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 25 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex == 33))) ||
        (zIndex == 26 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex >= 21 && xIndex <= 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 27 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 28 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 9) || (xIndex == 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 29 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 22) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 30 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 22) || (xIndex == 30) || (xIndex == 32) || (xIndex == 33))) ||
        (zIndex == 31 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 22) || (xIndex == 30) || (xIndex == 32) || (xIndex == 33))) ||
        (zIndex == 32 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 21) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 33 && ((xIndex == 1) || (xIndex >= 4 && xIndex <= 5) || (xIndex == 21) || (xIndex == 30) || (xIndex >= 32 && xIndex <= 33))) ||
        (zIndex == 34 && ((xIndex == 1) || (xIndex == 4) || (xIndex == 21) || (xIndex == 30) || (xIndex == 32))) ||
        (zIndex == 35 && ((xIndex == 1) || (xIndex == 4) || (xIndex == 21) || (xIndex == 30) || (xIndex == 32)))
      ) {
        typeOfBlock = 'B';
      }
      return rockType === "todos" || rockType === typeOfBlock;
    });

    // Filtrar por tipo de metal
    const filteredByMetal = filteredByRock.filter(cube => {
      if (metalType === "todos") return true;
      if (metalType === "oro" && cube[4] > 0) return true;
      if (metalType === "plata" && cube[5] > 0) return true;
      return false;
    });

    return filteredByMetal;
  }
}
