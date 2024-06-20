export async function loadFile(txt = 'Scenario00.txt') {
  const path = `src/assets/${txt}`;
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Error al cargar el archivo');
    const textData = await response.text();
    console.log('Cargando datos...');
    let data = [];
    let cube = [];
    textData.split('\n').forEach((line) => {
      line.split(',').forEach((element) => {
        cube.push(parseFloat(element));
      });
      if (cube.length === 6) {
        data.push(cube);
        cube = [];
      }
    });
    return data;
  } catch (error) {
    console.error('Error al cargar el archivo: ', error);
    return null;
  }
}

export async function loadPeriod(txt = 'Scenario00.txt', period = -1) {
  const data = await loadFile(txt);
  if (period === -1) return data;
  return data.filter((cube) => cube[0] === period);
}