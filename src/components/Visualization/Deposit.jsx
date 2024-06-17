import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';

const Deposit = ({ setLoading, setInfo }) => {
  const { data } = useFilter();
  const containerRef = useRef(null);

  if (data.length === 1531) {
    setLoading(false);
  }

  useEffect(() => {
    console.log('datos cargados. Renderizando');
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();

    scene.background = new THREE.Color('#FFFFFF');
    const camera = new THREE.PerspectiveCamera(
      90,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000,
    );

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    // Crear la geometría del cubo
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    // Crear el material por defecto y materiales específicos
    const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cubeMaterials = {
      gold: new THREE.MeshBasicMaterial({ color: 0xffd700 }),
      silver: new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }),
    };

    // Crear el InstancedMesh para los cubos
    const numCubes = data.length; // Suponiendo que 'data' es tu arreglo de cubos
    const cubesMesh = new THREE.InstancedMesh(
      boxGeometry,
      defaultMaterial,
      numCubes,
    );

    // Matriz de transformación para cada cubo
    const matrix = new THREE.Matrix4();
    const spacing = 2; // Espaciado entre cubos

    setInfo('Generando geometria...');
    // Configurar la posición y material para cada cubo
    data.forEach((cube, index) => {
      let material = defaultMaterial;

      if (cube[4] > 0) material = cubeMaterials.gold;
      else if (cube[5] > 0) material = cubeMaterials.silver;

      // Establecer la posición del cubo en la matriz
      matrix.setPosition(cube[0], cube[1], cube[2]);
      cubesMesh.setMatrixAt(index, matrix);
    });
    // Agregar el InstancedMesh a la escena
    scene.add(cubesMesh);
    // Posicionar la cámara
    camera.position.set(30, 30, 15);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [data]);

  return (
    <div
      id="3d-visualization"
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default Deposit;
