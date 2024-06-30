import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';
import { styles } from './Style';

const Deposit = () => {
  console.log('Esperando datos...');
  const { scenarioData, setLoading } = useFilter();
  const containerRef = useRef(null);

  if (scenarioData.length === 1531) {
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
      60,
      container.offsetWidth / container.offsetHeight,
      0.1,
      100,
    );
    camera.lookAt(0, 0, 0);

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    const axesHelper = new THREE.AxesHelper(25);
    scene.add(axesHelper);
    /*
    const gridSize = 25;
    const gridDivisions = 25;

    const gridXY = new THREE.GridHelper(gridSize, gridDivisions);
    scene.add(gridXY);

    const gridXZ = new THREE.GridHelper(gridSize, gridDivisions);
    gridXZ.rotation.x = Math.PI / 2;
    scene.add(gridXZ);

    const gridYZ = new THREE.GridHelper(gridSize, gridDivisions);
    gridYZ.rotation.z = Math.PI / 2;
    scene.add(gridYZ);
*/
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    const cubeGroup = new THREE.Group();

    scenarioData.forEach((cube) => {
      const hexColor = `#${((Math.round((cube[4] / cube[3]) * 255) << 16) | (Math.round((cube[4] / cube[3]) * 90) << 8) | Math.round((cube[4] / cube[3]) * 10)).toString(16).padStart(6, '0')}`;
      const boxMesh = new THREE.Mesh(
        boxGeometry,
        new THREE.MeshBasicMaterial({ color: hexColor }),
      );
      boxMesh.position.set(cube[0], cube[1], cube[2]);
      boxMesh.userData = { info: cube };
      cubeGroup.add(boxMesh);
    });
    const boundingBox = new THREE.Box3().setFromObject(cubeGroup);
    const center = boundingBox.getCenter(new THREE.Vector3());
    cubeGroup.position.sub(center);

    scene.add(cubeGroup);

    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(30, 30, 15);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
    let totalVertices = 0;
    scene.traverse(function (object) {
      if (object.isMesh) {
        const geometry = object.geometry;
        if (geometry.isBufferGeometry) {
          totalVertices += geometry.attributes.position.count;
        } else if (geometry.isGeometry) {
          totalVertices += geometry.vertices.length;
        }
      }
    });
    console.log('totalVertices: ' + totalVertices);

    return () => {
      renderer.dispose();
    };
  }, [scenarioData]);

  return (
    <div
      id="3d-visualization"
      ref={containerRef}
      style={styles.visualization}
    ></div>
  );
};

export default Deposit;
