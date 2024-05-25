import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Cube } from './src/model/classes/Cube.js';

let minValue = 0;
let maxValue = 0;
let cont = 0;
// Mapa de colores para cada tipo de cubo
const typeColorMap = {
    'hierro': '#808080',  // Gris
    'oro': '#FFD700',  // Amarillo
    'cobre': '#FFA500',  // Naranja
};

// Función para obtener un tipo aleatorio ("hierro", "oro", "cobre")
const getRandomType = () => {
    const types = ['hierro', 'oro', 'cobre'];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

const cubeColor = (cubey, cubeMineralLey) => {
    if(cubeMineralLey == null){
        return "#FFFFFF";
    }
    const nomralizeLey = (cubeMineralLey - minValue)/(maxValue - minValue);
    const hexNormalize = (parseInt(nomralizeLey * 255));
    const color = (hexNormalize <= 15 ? "0" + hexNormalize.toString(16) : hexNormalize.toString(16)).toString();
    const hex = "#" + color + "" + parseInt(cubey*3).toString() + parseInt(cubey*3).toString();
    // const hex = "#" + color + "A1A1";
    return hex;
}

fetch('Scenario02.txt')
.then(response => {
  if (!response.ok) {
    throw new Error('Error al cargar el archivo');
  }
  return response.text();
})
.then(textData => {
    const cube = new Cube(2, 2, 1);
    console.log("info" + cube.getCords()[0]);
    let cubes = [];
    const data = textData.split('\n');
    data.forEach(cube => {
        cubes.push(cube.split(","));
  })
  setInterval(() => {mainCode(cubes)}, 1000);
})
.catch(error => {
  console.error('Error al cargar el archivo:', error);
});

const mainCode = (cubesData) => {

    console.log(cont);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,  window.innerHeight / 2, window.innerHeight / -2, 1, 100);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    minValue = greyScale()[0];
    maxValue = greyScale()[1];
    cubesData.forEach(cube => {
        // if(cube[0] == cont){
            // console.log("cargando")
            const solidMaterial = new THREE.MeshBasicMaterial({ color: cubeColor(cube[1], cube[4]) });
    
            // Material para el wireframe (borde negro)
            const wireframeMaterial = new THREE.MeshBasicMaterial({ color: "#000000", wireframe: true });
    
            const solidCube = new THREE.Mesh(boxGeometry, solidMaterial);
            const wireframeCube = new THREE.Mesh(boxGeometry, wireframeMaterial);
    
            // Agrupa ambos para crear el efecto de bordes negros
            const cubeGroup = new THREE.Group();
            cubeGroup.add(solidCube);
            // cubeGroup.add(wireframeCube);
    
            cubeGroup.type = "hierro";  // Asigna el tipo al grupo
            
            // Posiciona el cubo en la cuadrícula 3D
            cubeGroup.position.set(
                cube[0] * spacing,
                cube[1] * spacing,
                cube[2] * spacing
            );
    
            cubesToScreen.push(cubeGroup);  // Añade el grupo a la lista
            scene.add(cubeGroup);  // Añade el grupo a la escena
            // console.log("cont: " + cont);
            // animate();
        // }
        // cont++;
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

    document.body.appendChild(buttonContainer);  // Añade el contenedor de botones al cuerpo del documento
}