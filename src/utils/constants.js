export const DEFAULT_SCENARIO = 'Scenario00.txt';
export const DEFAULT_PERIOD = -1;
export const DEFAULT_LAW_RANGE = [0, 100];
export const DEFAULT_ROCK_TYPE = 'todos';
export const DEFAULT_METAL_TYPE = 'todos';
export const DEFAULT_ACTIVE_PAGE = 'inicio';
export const MINERAL_PRICE = 50;
export const EXTRACTION_COST_PER_BLOCK = 10000;
export const VALID_RANGES = {
  1: [[0, 2], [6, 9], [13, 14], [18, 19], [23, 25], [29, 30], [35]],
  2: [[0, 2], [6, 8], [13, 14], [18, 19], [23, 24], [29, 30], [34]],
  3: [[0, 1], [5, 8], [12, 14], [17, 18], [22, 23], [28, 29], [35]],
  4: [[0, 1], [5, 7], [12, 13], [17, 18], [22, 23], [27, 28], [35]],
  5: [[5, 7], [11, 13], [17, 18], [22, 23], [27, 28], [32], [35]],
  6: [[4, 6], [11, 13], [17], [21, 22], [27, 28], [32], [35]],
  7: [[4, 5], [11, 13], [16, 17], [20, 22], [26, 27], [31], [35]],
  8: [[1], [3, 5], [7], [11, 12], [16], [20, 21], [26, 27], [31], [34, 35]],
  9: [[0, 6], [10, 16], [19, 22], [26, 28], [31], [34, 35]],
  10: [[0, 4], [9, 14], [19, 20], [25, 27], [31], [33]],
  11: [
    [0, 3],
    [8, 13],
    [17, 20],
    [24, 26],
    [30, 32],
  ],
  12: [[0, 35]], // zIndex 12: todos los xIndex son válidos
};
export const PERIODS = [
  { value: -1, label: 'Sin filtro' },
  { value: 0, label: 'Periodo 0' },
  { value: 1, label: 'Periodo 1' },
  { value: 2, label: 'Periodo 2' },
  { value: 3, label: 'Periodo 3' },
  { value: 4, label: 'Periodo 4' },
  { value: 5, label: 'Periodo 5' },
];
export const SCENARIOS = [
  { value: 'Scenario00.txt', label: 'Escenario 0' },
  { value: 'Scenario01.txt', label: 'Escenario 1' },
  { value: 'Scenario02.txt', label: 'Escenario 2' },
  { value: 'Scenario03.txt', label: 'Escenario 3' },
  { value: 'Scenario04.txt', label: 'Escenario 4' },
  { value: 'Scenario05.txt', label: 'Escenario 5' },
  { value: 'Scenario06.txt', label: 'Escenario 6' },
  { value: 'Scenario07.txt', label: 'Escenario 7' },
  { value: 'Scenario08.txt', label: 'Escenario 8' },
  { value: 'Scenario09.txt', label: 'Escenario 9' },
];
export const ROCK_TYPES = [
  { value: 'todos', label: 'Todos' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
];

export const METAL_TYPES = [
  { value: 'todos', label: 'Todos' },
  { value: 'oro', label: 'Oro' },
  { value: 'plata', label: 'Plata' },
];
