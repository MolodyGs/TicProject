import { DEFAULT_SCENARIO } from '../utils/constants';

async function loadFile(txt) {
  const path = `src/assets/${txt}`;
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Error al cargar el archivo');
    const textData = await response.text();
    const data = await parseData(textData);
    return data;
  } catch (error) {
    console.error('Error al cargar el archivo: ', error);
    return null;
  }
}

export async function loadScenario(txt = DEFAULT_SCENARIO) {
  return await loadFile(txt);
}

export async function loadMinePlan(txt = 'MinePlan.txt') {
  return await loadFile(txt);
}

async function parseData(textData) {
  return textData
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const elements = line.split(',');
      return elements.map(parseFloat);
    });
}
