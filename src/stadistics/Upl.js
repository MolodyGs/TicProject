
export const visualizeVerticalMine = (uplData, elementId) => {
  const container = document.getElementById(elementId);
  if (!container) return;

  // Limpia el contenedor antes de renderizar
  container.innerHTML = '';

  // Supongamos que uplData contiene objetos con propiedades { x, y, z, blockValue }
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Crear un SVG para la visualización 2D
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  uplData.forEach(block => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', block.x * (width / 10)); // Escalar según el tamaño del contenedor
    rect.setAttribute('y', height - block.z * (height / 10)); // Escalar y revertir el eje Y
    rect.setAttribute('width', width / 10);
    rect.setAttribute('height', height / 10);
    rect.setAttribute('fill', `rgba(255, 0, 0, ${block.blockValue})`); // Color basado en el valor del bloque
    svg.appendChild(rect);
  });

  container.appendChild(svg);
};
