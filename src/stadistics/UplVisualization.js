import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class UplVisualization {
  loadVisualization = (cubesData, uplValue) => {
    const container = document.getElementById('upl-visualization');
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
    const cubeWireframeMaterial = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true });

    const createSurfaceWithHoles = (cubesData) => {
      const surfaceSize = 42; // 40 x 40 surface
      const maxDepth = 12; // Max depth
      const surface = new Array(surfaceSize).fill(0).map(() => new Array(surfaceSize).fill(maxDepth));

      cubesData.forEach(cube => {
        const x = Math.floor(cube[0]);
        const y = Math.floor(cube[1]);
        const z = Math.floor(cube[2]);
        if (x >= 0 && x < surfaceSize && y >= 0 && y < surfaceSize) {
          for (let i = 0; i <= z; i++) {
            // Create a cone shape by reducing depth in a radius
            const radius = z - i;
            for (let dx = -radius; dx <= radius; dx++) {
              for (let dy = -radius; dy <= radius; dy++) {
                if (x + dx >= 0 && x + dx < surfaceSize && y + dy >= 0 && y + dy < surfaceSize) {
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  if (distance <= radius) {
                    surface[x + dx][y + dy] = Math.min(surface[x + dx][y + dy], z - i);
                  }
                }
              }
            }
          }
        }
      });

      return surface;
    };

    const createBlockGroup = (x, y, z, color) => {
      const material = new THREE.MeshBasicMaterial({ color });

      const solidCube = new THREE.Mesh(boxGeometry, material);
      const wireframeCube = new THREE.Mesh(boxGeometry, cubeWireframeMaterial.clone());

      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.add(wireframeCube);

      cubeGroup.position.set(x, z, y); // Invertir la posición en Y

      return cubeGroup;
    };

    const surfaceData = createSurfaceWithHoles(cubesData);

    surfaceData.forEach((row, x) => {
      row.forEach((depth, y) => {
        for (let z = 0; z < depth; z++) {
          let color;
          if (z < 1) {
            color = new THREE.Color('red');
          } else if (z < 3) {
            color = new THREE.Color('orange');
          } else if (z < 5) {
            color = new THREE.Color('yellow');
          } else if (z < 7) {
            color = new THREE.Color('green');
          } else if (z < 9) {
            color = new THREE.Color('blue');
          } else if (z < 11) {
            color = new THREE.Color('indigo');
          } else {
            color = new THREE.Color('violet');
          }
          const cubeGroup = createBlockGroup(x, y, z, color);
          scene.add(cubeGroup);
        }
      });
    });

    camera.position.set(0, 40, 40);
    controls.update();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
}
