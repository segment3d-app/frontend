"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { useGesture, useMove, useScroll, useWheel } from "@use-gesture/react";

interface PointCloudViewerProps {
  plyFilePath: string;
}

const PointCloudViewer: React.FC<PointCloudViewerProps> = ({ plyFilePath }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useWheel(
    (state) => {
      const zoomSpeed = 0.1;
      const zoomMultiplier = 1;
      const [x, y] = state.delta;
      const zoomAmount = (x + y) * zoomSpeed * zoomMultiplier;
      if (cameraRef.current && state.down) {
        cameraRef.current.position.z -= zoomAmount;
      } else if (cameraRef.current && !state.down) {
        cameraRef.current.position.z += zoomAmount;
      }
    },
    {
      target: mountRef,
    },
  );

  useMove(
    (state) => {
      const [x, y] = state.movement;
      const sensitivity = 0.01;

      if (cameraRef.current) {
        const camera = cameraRef.current;
        const radius = camera.position.length();

        let newX = camera.position.x;
        let newY = camera.position.y;

        // Adjust the camera's position based on the movement
        if (Math.abs(x) > Math.abs(y)) {
          // Horizontal movement
          camera.rotateY(-x * sensitivity);
        } else {
          // Vertical movement
          camera.rotateX(-y * sensitivity);
        }

        // Calculate the new target position (always facing the origin)
        const target = new THREE.Vector3(0, 0, 0);
        camera.lookAt(target);
      }
    },
    {
      target: mountRef,
    },
  );

  // useGesture(
  //   {
  //     onDrag: (state) => {
  //       // console.log("drag");
  //       const [x, y] = state.movement;
  //       const sensitivity = 0.01; // Adjust sensitivity as needed

  //       if (cameraRef.current) {
  //         const camera = cameraRef.current;
  //         const radius = camera.position.length(); // Distance from the origin

  //         // Calculate the new position of the camera around the origin
  //         const newX = radius * Math.cos(sensitivity * x);
  //         const newXZ = radius * Math.sin(sensitivity * x);

  //         const newY = radius * Math.cos(sensitivity * y);
  //         const newYZ = radius * Math.sin(sensitivity * y)

  //         if (x > y) {
  //           camera.position.x = newX;
  //           camera.position.z = newXZ;
  //         } else {
  //           camera.position.y = newY;
  //           camera.position.z = newYZ;
  //         }

  //         // Calculate the new target position (always facing the origin)
  //         const target = new THREE.Vector3(0, 0, 0);
  //         camera.lookAt(target);
  //       }
  //     },
  //     onPinch: (state) => {
  //       if (cameraRef.current) {
  //         cameraRef.current.position.z += state.da[0]; // Adjust zoom speed as needed
  //       }
  //     },
  //     onScroll: (state) => {
  //     },
  //   },
  //   {
  //     target: mountRef,
  //   },
  // );

  // const { bind } = useGestureResponder({
  //   onStartShouldSet: () => true,
  //   onMove: ({ delta }) => {
  //     // Rotate the camera based on swipe gesture
  //     const [ x, y ] = delta;
  //     if (cameraRef.current) {
  //       cameraRef.current.rotation.y -= x * 0.01; // Adjust rotation speed as needed
  //       cameraRef.current.rotation.x -= y * 0.01;
  //     }
  //   },
  //   // onPinch: ({ delta }) => {
  //   //   // Zoom in or out based on pinch gesture
  //   //   if (cameraRef.current) {
  //   //     cameraRef.current.position.z += delta / 100; // Adjust zoom speed as needed
  //   //   }
  //   // },
  // });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, camera, and renderer setup
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // PLY file loader
    const loader = new PLYLoader();
    loader.load(plyFilePath, (geometry) => {
      // Assuming the ply file contains vertex colors. If not, you'll need to adjust the material
      const material = new THREE.PointsMaterial({
        size: 0.05,
        // vertexColors: THREE.VertexColors,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      // Center the point cloud
      geometry.computeBoundingBox();
      geometry.boundingBox?.getCenter(points.position).multiplyScalar(-1);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize, false);

    // Cleanup
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
