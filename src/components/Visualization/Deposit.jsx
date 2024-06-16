import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';

const Deposit = () => {
  const { data } = useFilter();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');
    const camera = new THREE.PerspectiveCamera(
      90,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const defaultMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const cubeWireframeMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      wireframe: true,
    });

    const cubeMaterials = {
      gold: new THREE.MeshBasicMaterial({ color: 0xffd700 }),
      silver: new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }),
    };

    const spacing = 1;

    data.forEach((cube) => {
      let material = defaultMaterial;

      if (cube[4] > 0) material = cubeMaterials.gold;
      else if (cube[5] > 0) material = cubeMaterials.silver;

      const solidCube = new THREE.Mesh(boxGeometry, material);
      const wireframeCube = new THREE.Mesh(boxGeometry, cubeWireframeMaterial);

      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.add(wireframeCube);

      cubeGroup.position.set(
        cube[0] * spacing,
        cube[1] * spacing,
        cube[2] * spacing,
      );
      scene.add(cubeGroup);
    });

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
