export class Filter {
  constructor() {}

  async loadFilter(txt, period, filterType) {
    const filteredData = await minePlan.loadPeriod(txt, period);

    if (filterType === -1) {
      return filteredData;
    }

    const typeBConditions = (x, z) => {
      // Aquí van las condiciones para los bloques de tipo B
      if (
        (z == 1 && ((x <= 2) || (x >= 6 && x <= 9) || (x >= 13 && x <= 14) || (x >= 18 && x <= 19) || (x >= 23 && x <= 25) || (x >= 29 && x <= 30) || (x >= 35))) ||
        (z == 2 && ((x <= 2) || (x >= 6 && x <= 8) || (x >= 13 && x <= 14) || (x >= 18 && x <= 19) || (x >= 23 && x <= 24) || (x >= 29 && x <= 30) || (x >= 34))) ||
        (z == 3 && ((x <= 1) || (x >= 5 && x <= 8) || (x >= 12 && x <= 14) || (x >= 17 && x <= 18) || (x >= 22 && x <= 23) || (x >= 28 && x <= 29) || (x >= 35))) ||
        (z == 4 && ((x <= 1) || (x >= 5 && x <= 7) || (x >= 12 && x <= 13) || (x >= 17 && x <= 18) || (x >= 22 && x <= 23) || (x >= 27 && x <= 28) || (x >= 35))) ||
        (z == 5 && ((x >= 5 && x <= 7) || (x >= 11 && x <= 13) || (x >= 17 && x <= 18) || (x >= 22 && x <= 23) || (x >= 27 && x <= 28) || (x == 32) || (x >= 35))) ||
        (z == 6 && ((x >= 4 && x <= 6) || (x >= 11 && x <= 13) || (x == 17) || (x >= 21 && x <= 22) || (x >= 27 && x <= 28) || (x == 32) || (x >= 35))) ||
        (z == 7 && ((x >= 4 && x <= 5) || (x >= 11 && x <= 13) || (x >= 16 && x <= 17) || (x >= 20 && x <= 22) || (x >= 26 && x <= 27) || (x == 31) || (x == 35))) ||
        (z == 8 && ((x == 1) || (x >= 3 && x <= 5) || (x == 7) || (x >= 11 && x <= 12) || (x == 16) || (x >= 20 && x <= 21) || (x >= 26 && x <= 27) || (x == 31) || (x >= 34 && x <= 35))) ||
        (z == 9 && ((x <= 6) || (x >= 10 && x <= 16) || (x >= 19 && x <= 22) || (x >= 26 && x <= 28) || (x == 31) || (x >= 34 && x <= 35))) ||
        (z == 10 && ((x <= 4) || (x >= 9 && x <= 14) || (x >= 19 && x <= 20) || (x >= 25 && x <= 27) || (x == 31) || (x == 33))) ||
        (z == 11 && ((x <= 3) || (x >= 8 && x <= 13) || (x >= 17 && x <= 20) || (x >= 24 && x <= 26) || (x >= 30 && x <= 32))) ||
        (z == 12)
      ) {
        return true;
      }
      return false;
    };

    if (filterType === "A") {
      return filteredData.filter(cube => !typeBConditions(cube[0], cube[2]));
    } else if (filterType === "B") {
      return filteredData.filter(cube => typeBConditions(cube[0], cube[2]));
    }

    return filteredData;
  }
}
