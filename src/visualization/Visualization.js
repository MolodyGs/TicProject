import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { render } from 'react-dom';

export class Visualization {
  loadVisualization = (cubesData) => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1920, window.innerHeight);
    if (document.querySelector("body canvas")) {
      document.querySelector("body canvas").parentNode.removeChild(document.querySelector("body canvas"));
    }
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubesToScreen = [];
    const gridSize = 8;
    const spacing = 1;
    const offset = (gridSize - 1) * spacing / 2;

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

    const minValue = greyScale()[0];
    const maxValue = greyScale()[1];

    cubesData.forEach(cube => {
      const solidMaterial = new THREE.MeshBasicMaterial({ color: "red" });
      const wireframeMaterial = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true });
      const solidCube = new THREE.Mesh(boxGeometry, solidMaterial);
      const wireframeCube = new THREE.Mesh(boxGeometry, wireframeMaterial);
      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.add(wireframeCube);

      cubeGroup.type = cube[3] === "B" ? "B" : "A";

      cubeGroup.position.set(
        cube[0] * spacing,
        cube[1] * spacing,
        cube[2] * spacing
      );

      cubesToScreen.push(cubeGroup);
      scene.add(cubeGroup);
    });

    camera.position.z = 30;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    const filterCubes = (type) => {
      cubesToScreen.forEach(cube => {
        if (type === 'todos' || cube.type === type) {
          cube.visible = true;
        } else {
          cube.visible = false;
        }
      });
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.top = '10px';
    buttonContainer.style.right = '10px';

    const buttonAll = document.createElement('button');
    buttonAll.innerText = 'Todos';
    buttonAll.onclick = () => filterCubes('todos');

    const buttonA = document.createElement('button');
    buttonA.innerText = 'A';
    buttonA.onclick = () => filterCubes('A');

    const buttonB = document.createElement('button');
    buttonB.innerText = 'B';
    buttonB.onclick = () => filterCubes('B');

    buttonContainer.appendChild(buttonAll);
    buttonContainer.appendChild(buttonA);
    buttonContainer.appendChild(buttonB);
    document.body.appendChild(buttonContainer);
  }
}
