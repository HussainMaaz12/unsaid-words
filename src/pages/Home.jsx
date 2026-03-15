import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Carousel3D from '../components/Carousel3D';
import HeartButton from '../components/HeartButton';

const Home = () => {
  return (
    <PageTransition>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>

        {/* Full-Screen 3D Canvas - no postprocessing for performance */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]} // Limit pixel ratio for performance
          >
            <ambientLight intensity={1.2} />
            <pointLight position={[0, 5, 5]} intensity={2} color="#ff4d6d" />
            <pointLight position={[0, -5, -5]} intensity={1} color="#7b2d8b" />

            <Suspense fallback={null}>
              <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
                <Carousel3D />
              </Float>
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2 - 0.15}
              maxPolarAngle={Math.PI / 2 + 0.15}
              makeDefault
            />
          </Canvas>
        </div>

        {/* Text and CTA overlaying the 3D scene */}
        <motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, type: 'spring' }}
          style={{
            padding: '25px 30px',
            textAlign: 'center',
            maxWidth: '580px',
            width: '95%',
            zIndex: 11,
            color: '#fff',
            marginTop: 'clamp(40vh, 50vh, 58vh)', // responsive vertical push
            background: 'rgba(15, 8, 20, 0.55)',
            border: '1px solid rgba(255, 77, 109, 0.4)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,77,109,0.15)',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              fontSize: 'clamp(1.8rem, 7vw, 3rem)',
              margin: '0 0 8px 0',
              fontFamily: 'Playfair Display, serif',
              textShadow: '0 0 25px rgba(255, 77, 109, 0.9)',
              lineHeight: 1.2,
            }}
          >
            Hey Deepshikha 💖
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            style={{
              margin: '0 0 8px 0',
              lineHeight: '1.65',
              fontSize: 'clamp(0.9rem, 3vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            Before you go further... <br />
            🌙 Every click takes you closer to what I never said. <br />
            I just wanted to make you smile today.
          </motion.p>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '5px' }}>
            ↔ Drag to rotate the gallery
          </p>

          <HeartButton to="/puzzle">
            Enter the Experience ✨
          </HeartButton>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Home;
