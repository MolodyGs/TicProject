import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';

const Deposit = ({ setLoading }) => {
  console.log('Esperando datos...');
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
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    let color1 = '';
    let color2 = '';
    let color3 = '';
    let hexColor = 0;

    const matrix = new THREE.Matrix4();

    let cubeGroup = new THREE.Group();
    data.forEach((cube) => {
      hexColor = cube[4] / cube[3];
      color1 = Math.round(hexColor * 255).toString(16);
      color2 = Math.round(hexColor * 90).toString(16);
      color3 = Math.round(hexColor * 10).toString(16);
      color1.length == 1 ? (color1 = '0' + color1) : color1;
      color2.length == 1 ? (color2 = '0' + color2) : color2;
      color3.length == 1 ? (color3 = '0' + color3) : color3;
      hexColor = (
        '#' +
        color1.toString() +
        color2.toString() +
        color3.toString()
      ).toString(16);
      if (hexColor.length < 2) {
        hexColor = '0' + hexColor;
      }

      const boxMesh = new THREE.Mesh(boxGeometry);
      let defaultMaterial = new THREE.MeshBasicMaterial({ color: hexColor });
      boxMesh.material = defaultMaterial;

      matrix.setPosition(cube[0], cube[1], cube[2]);
      boxMesh.applyMatrix4(matrix);
      cubeGroup.add(boxMesh);
    });
    scene.add(cubeGroup);

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
