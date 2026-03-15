import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createFallbackDepthMap } from '../utils/depthMap';

const RotatingPicture = ({ imageUrl }) => {
  const meshRef = useRef();
  
  // Create the fallback depth map once
  const depthMapUrl = useMemo(() => createFallbackDepthMap(), []);

  // Load textures
  const [texture, depthTexture] = useTexture([imageUrl, depthMapUrl]);

  // Animate: Add an elegant, subtle auto-rotation and tilt based on mouse position
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Auto idle rotation
    const t = state.clock.getElapsedTime();
    const idleY = Math.sin(t / 2) * 0.1;
    const idleX = Math.cos(t / 2) * 0.1;

    // Mouse interactive rotation
    // Limit the rotation so the displacement doesn't break perspective
    const mouseX = (state.pointer.x * Math.PI) / 12;
    const mouseY = (state.pointer.y * Math.PI) / 12;

    // Smooth interpolation (lerp)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX + idleY, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY + idleX, 0.1);
    
    // Subtle float
    meshRef.current.position.y = Math.sin(t) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      {/* 
        High segment count is required for displacement maps so the geometry can bend. 
        Args: [width, height, widthSegments, heightSegments]
      */}
      <planeGeometry args={[3, 4, 128, 128]} />
      
      <meshStandardMaterial 
        map={texture} 
        displacementMap={depthTexture}
        // displacementScale controls how intense the 3D bulge is
        displacementScale={0.3}
        // displacementBias pulls the whole image back so the edges stay roughly near Z=0
        displacementBias={-0.15}
        side={THREE.DoubleSide} 
        roughness={0.4}
        metalness={0.1}
      />
      
      {/* Optional: Edge frame for realism, pushed back slightly to account for the displacement bias */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[3.2, 4.2]} />
        <meshStandardMaterial color="#fff" side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
};

export default RotatingPicture;
