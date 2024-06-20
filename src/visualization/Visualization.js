import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Visualization {
  loadVisualization = (cubesData) => {
    const container = document.getElementById('3d-visualization');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');
    const camera = new THREE.PerspectiveCamera(90, container.offsetWidth / container.offsetHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.innerHTML = ''; // Clear previous content
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const cubeWireframeMaterial = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true });

    const cubesToScreen = [];
    const gridSize = 8;
    const spacing = 1;

    const greyScale = () => {
      let min = 99999;
      let max = 0;
      cubesData.forEach(cube => {
        const value = parseFloat(cube[4]);
        if (value > max) {
          max = value;
        } else if (value < min) {
          min = value;
        }
      });
      return [min, max];
    };

    cubesData.forEach(cube => {
      let material;

      if (cube[4] > 0) {
        // Si hay oro en el bloque, asigna el color amarillo oscuro
        material = new THREE.MeshBasicMaterial({ color: 0xFFD700 }); // Amarillo oscuro
      } else if (cube[5] > 0) {
        // Si hay plata en el bloque, asigna el color gris claro
        material = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 }); // Gris claro
      } else {
        // Si no hay oro ni plata, usa un material rojo por defecto
        material = cubeMaterial.clone();
      }

      const solidCube = new THREE.Mesh(boxGeometry, material);
      const wireframeCube = new THREE.Mesh(boxGeometry, cubeWireframeMaterial.clone());

      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.add(wireframeCube);

      cubeGroup.position.set(cube[0] * spacing, cube[1] * spacing, cube[2] * spacing);

      cubesToScreen.push(cubeGroup);
      scene.add(cubeGroup);
    });

    camera.position.z = 15;
    camera.position.x = 30;
    camera.position.y = 30;


    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

  visualizeVerticalMine = (cubesData) => {
    const container = document.getElementById('upl-visualization');
    if (!container) return;

    // Limpia el contenedor antes de renderizar
    container.innerHTML = '';

    const width = 200;
    const height = 400;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    const minY = Math.min(...cubesData.map(cube => cube[1]));
    const maxY = Math.max(...cubesData.map(cube => cube[1]));
    const yRange = maxY - minY;

    cubesData.forEach(cube => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      const normalizedY = (cube[1] - minY) / yRange;
      rect.setAttribute("x", 10);
      rect.setAttribute("y", height - (normalizedY * height));
      rect.setAttribute("width", 20);
      rect.setAttribute("height", 10);
      rect.setAttribute("fill", this.getColorFromLaw(cube[3]));

      svg.appendChild(rect);
    });

    container.appendChild(svg);
  }

  getColorFromLaw(law) {
    const colorValue = Math.floor((1 - law) * 255);
    return `rgb(255, ${colorValue}, ${colorValue})`;
  }
}
