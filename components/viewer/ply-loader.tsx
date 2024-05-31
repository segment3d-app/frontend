"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { useDrag, useWheel } from "@use-gesture/react";

interface PointCloudViewerProps {
  plyFilePath: string;
}

const PointCloudViewer: React.FC<PointCloudViewerProps> = ({ plyFilePath }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cameraControlsRef = useRef<THREE.Object3D>();

  useWheel(
    (state) => {
      if (state.wheeling && !state.dragging) {
        const zoomSpeed = 0.1;
        const zoomMultiplier = 1;
        const [x, y] = state.delta;
        const zoomAmount = (x + y) * zoomSpeed * zoomMultiplier;
        if (cameraRef.current && state.down) {
          cameraRef.current.position.z -= zoomAmount;
        } else if (cameraRef.current && !state.down) {
          cameraRef.current.position.z += zoomAmount;
        }
      }
    },
    {
      target: mountRef,
    },
  );

  useDrag(
    (state) => {
      if (state.dragging && !state.wheeling) {
        const [x, y] = state.movement;
        const sensitivity = 0.0004;

        if (cameraControlsRef.current) {
          const cameraControls = cameraControlsRef.current;
          cameraControls.rotation.x -= sensitivity * y;
          cameraControls.rotation.y -= sensitivity * x;
        }
      }
    },
    {
      target: mountRef,
    },
  );

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;
    cameraRef.current = camera;

    const cameraControls = new THREE.Object3D();
    scene.add(cameraControls);
    cameraControls.add(camera);
    cameraControlsRef.current = cameraControls;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const loader = new PLYLoader();
    loader.load(plyFilePath, (geometry) => {
      const material = new THREE.PointsMaterial({
        size: 0.001,
        vertexColors: true,
      });

      const colors = geometry.attributes.color;
      const numVertices = geometry.getAttribute("position").count;

      for (let i = 0; i < numVertices; i++) {
        const color = new THREE.Color(
          colors.getX(i),
          colors.getY(i),
          colors.getZ(i),
        );
        geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
      }

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      geometry.computeBoundingBox();
      geometry.boundingBox?.getCenter(points.position).multiplyScalar(-1);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize, false);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [plyFilePath]);

  return (
    <div
      className="fixed left-0 top-0 z-[1000] h-screen w-screen"
      ref={mountRef}
    />
  );
};

export default PointCloudViewer;
