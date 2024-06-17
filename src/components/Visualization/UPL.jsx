import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useFilter } from '../../hooks/useFilter';

const colors = [
  new THREE.Color('#202020'),
  new THREE.Color('#404040'),
  new THREE.Color('#606060'),
  new THREE.Color('#808080'),
  new THREE.Color('#A0A0A0'),
  new THREE.Color('#C0C0C0'),
  new THREE.Color('#E0E0E0'),
];

const UPL = ({ setLoading }) => {
  console.log('Esperando datos...');
  const { data, upl } = useFilter();
  const containerRef = useRef(null);

  if (data.length >= 1531) {
    setLoading(false);
  }

  useEffect(() => {
    console.log('Renderizando');
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

    const createRecGroup = (x, y, z, color) => {
      if (z == 0) return null;
      const material = new THREE.MeshBasicMaterial({ color });
      const recGeometry = new THREE.BoxGeometry(1, z, 1);
      if (z < 0) {
        console.log(z);
      }
      const solidCube = new THREE.Mesh(recGeometry, material);

      const cubeGroup = new THREE.Group();
      cubeGroup.add(solidCube);
      cubeGroup.position.set(x, z - z / 2, y);
      return cubeGroup;
    };

    let colorCont = 0;
    let colorContDirection = 1;

    const surfaceData = createSurfaceWithHoles(data);
    surfaceData.forEach((row, x) => {
      row.forEach((depth, y) => {
        const cubeGroup = createRecGroup(x, y, depth, colors[colorCont]);
        if (cubeGroup != null) {
          scene.add(cubeGroup);
        }
      });
      if (colorCont == 6) {
        colorContDirection = -1;
      } else if (colorCont == 0) {
        colorContDirection = 1;
      }
      colorCont += colorContDirection;
    });

    camera.position.set(0, 30, 75);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    //Calcula la cantidad de vertices en la escena
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
