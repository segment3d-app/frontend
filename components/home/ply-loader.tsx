"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

interface PointCloudViewerProps {
  plyFilePath: string;
}

const PointCloudViewer: React.FC<PointCloudViewerProps> = ({ plyFilePath }) => {
  const mountRef = useRef<HTMLDivElement>(null);

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
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [plyFilePath]);

  return <div ref={mountRef} />;
};

export default PointCloudViewer;
