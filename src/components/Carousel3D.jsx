import React, { Suspense, useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplified image-only card for maximum performance
const PhotoCard = ({ url, position, rotation }) => {
  const meshRef = useRef();
  const texture = useTexture(url);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const targetScale = hovered ? 1.06 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 8 * delta);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 8 * delta);
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Photo plane - image only, no heavy reflections */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[2.4, 3.4, 1, 1]} /> {/* Reduced segments for performance */}
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* Glowing CSS-friendly frame border (pure THREE plane behind) */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 3.6, 1, 1]} />
        <meshBasicMaterial color="#ff4d6d" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Carousel3D = () => {
  const groupRef = useRef();

  const images = useMemo(() => [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/4.jpeg',
    '/assets/images/img1.jpeg',
  ], []);

  const radius = 3.8;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08; // slower, smoother
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((url, i) => {
        const angle = (i / images.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <PhotoCard
            key={i}
            url={url}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          />
        );
      })}
    </group>
  );
};

export default Carousel3D;
