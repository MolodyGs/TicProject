import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { render } from 'react-dom';

export class Visualization{

    loadVisualization = (cubesData) => {

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#FFFFFF');
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1920, window.innerHeight);
        if(document.querySelector("body canvas")){
          document.querySelector("body canvas").parentNode.removeChild(document.querySelector("body canvas"));
        }
        document.body.appendChild(renderer.domElement);

        // Añade OrbitControls para controlar la cámara
        const controls = new OrbitControls(camera, renderer.domElement);

        // Crea geometría reutilizable para los cubos
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

        // Lista para almacenar cubos y sus tipos
        const cubesToScreen = [];

        // Dimensiones de la cuadrícula y espacio total
        const gridSize = 8;  // Tamaño de la cuadrícula (10x10x10 = 1000 cubos)
        const spacing = 1;  // Espacio entre cubos
        const offset = (gridSize - 1) * spacing / 2;  // Para centrar la cuadrícula

        const greyScale = () => {
            let min = 99999;
            let max = 0;
            cubesData.forEach(cube => {
                const value = parseFloat(cube[4]);
                if(value > max){
                    max = value;
                }else if(value < min){
                    min = value;
                }
            });
            return [min, max];
        }

        const minValue = greyScale()[0];
        const maxValue = greyScale()[1];

        cubesData.forEach(cube => {
            // console.log("Cargando cubo...")
            const solidMaterial = new THREE.MeshBasicMaterial({ color: "red" });

            // Material para el wireframe (borde negro)
            const wireframeMaterial = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true });

            const solidCube = new THREE.Mesh(boxGeometry, solidMaterial);
            const wireframeCube = new THREE.Mesh(boxGeometry, wireframeMaterial);

            // Agrupa ambos para crear el efecto de bordes negros
            const cubeGroup = new THREE.Group();
            cubeGroup.add(solidCube);
            cubeGroup.add(wireframeCube);

            cubeGroup.type = "hierro";  // Asigna el tipo al grupo

            // Posiciona el cubo en la cuadrícula 3D
            cubeGroup.position.set(
                cube[0] * spacing,
                cube[1] * spacing,
                cube[2] * spacing
            );

            cubesToScreen.push(cubeGroup);  // Añade el grupo a la lista
            scene.add(cubeGroup);  // Añade el grupo a la escena
        });

        // Posiciona la cámara para tener una vista amplia
        camera.position.z = 30;

        // Función de animación
        function animate() {
            requestAnimationFrame(animate);
            controls.update();  // Permite la interacción de la cámara
            renderer.render(scene, camera);  // Renderiza la escena
        }

        animate();  // Inicia la animación

        // Filtra los cubos según el tipo
        // function filterCubes(type) {
        //     cubes.forEach(cube => {
        //         if (type === 'todos' || cube.type === type) {
        //             cube.visible = true;  // Muestra el cubo si coincide el tipo
        //         } else {
        //             cube.visible = false;  // Oculta el cubo si no coincide el tipo
        //         }
        //     });
        // }

        // Añade botones para filtrar cubos
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.top = '10px';
        buttonContainer.style.right = '10px';

        const buttonAll = document.createElement('button');
        buttonAll.innerText = 'Todos';
        buttonAll.onclick = () => filterCubes('todos');

        const buttonIron = document.createElement('button');
        buttonIron.innerText = 'Hierro';
        buttonIron.onclick = () => filterCubes('hierro');

        const buttonGold = document.createElement('button');
        buttonGold.innerText = 'Oro';
        buttonGold.onclick = () => filterCubes('oro');

        const buttonCopper = document.createElement('button');
        buttonCopper.innerText = 'Cobre';
        buttonCopper.onclick = () => filterCubes('cobre');

        buttonContainer.appendChild(buttonAll);
        buttonContainer.appendChild(buttonIron);
        buttonContainer.appendChild(buttonGold);
        buttonContainer.appendChild(buttonCopper);
        document.body.appendChild(buttonContainer);
    }

}