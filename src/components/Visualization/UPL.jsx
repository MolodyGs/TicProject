import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';

const UPL = () => {
  const { data, upl } = useFilter();
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
    const cubeWireframeMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      wireframe: true,
    });

    const createSurfaceWithHoles = (data) => {
      const surfaceSize = 42;
      const maxDepth = 12;
      const surface = new Array(surfaceSize)
        .fill(0)
        .map(() => new Array(surfaceSize).fill(maxDepth));
      data.forEach((cube) => {
        const x = Math.floor(cube[0]);
        const y = Math.floor(cube[1]);
        const z = Math.floor(cube[2]);
        if (x >= 0 && x < surfaceSize && y >= 0 && y < surfaceSize) {
          for (let i = 0; i <= z; i++) {
            const radius = z - i;
            for (let dx = -radius; dx <= radius; dx++) {
              for (let dy = -radius; dy <= radius; dy++) {
                if (
                  x + dx >= 0 &&
                  x + dx < surfaceSize &&
                  y + dy >= 0 &&
                  y + dy < surfaceSize
                ) {
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  if (distance <= radius) {
                    surface[x + dx][y + dy] = Math.min(
                      surface[x + dx][y + dy],
                      z - i,
                    );
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
      const wireframeCube = new THREE.Mesh(
        boxGeometry,
        cubeWireframeMaterial.clone(),
      );

      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.add(wireframeCube);

      cubeGroup.position.set(x, z, y);
      return cubeGroup;
    };

    const surfaceData = createSurfaceWithHoles(data);

    surfaceData.forEach((row, x) => {
      row.forEach((depth, y) => {
        for (let z = 0; z < depth; z++) {
          let color;
          if (z < 1) color = new THREE.Color('red');
          else if (z < 3) color = new THREE.Color('orange');
          else if (z < 5) color = new THREE.Color('yellow');
          else if (z < 7) color = new THREE.Color('green');
          else if (z < 9) color = new THREE.Color('blue');
          else if (z < 11) color = new THREE.Color('indigo');
          else color = new THREE.Color('violet');

          const cubeGroup = createBlockGroup(x, y, z, color);
          scene.add(cubeGroup);
        }
      });
    });

    camera.position.set(0, 40, 40);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [data, upl]);

  return (
    <div
      id="upl-visualization"
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default UPL;
