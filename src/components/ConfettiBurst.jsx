import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Confetti particle colors
const COLORS = [
  '#ff4d6d', '#ffd166', '#06d6a0', '#118ab2', '#ff85a1',
  '#c77dff', '#ffffff', '#ffb3c1', '#f72585', '#4cc9f0',
];

const randomBetween = (a, b) => a + Math.random() * (b - a);

// Generate particles bursting from left and right edges
const generateParticles = (count = 80) => {
  return Array.from({ length: count }, (_, i) => {
    const fromLeft = i < count / 2;
    return {
      id: i,
      fromLeft,
      x0: fromLeft ? -20 : window.innerWidth + 20,
      y0: randomBetween(window.innerHeight * 0.3, window.innerHeight * 0.7),
      xEnd: fromLeft
        ? randomBetween(50, window.innerWidth * 0.6)
        : randomBetween(window.innerWidth * 0.4, window.innerWidth - 50),
      yEnd: randomBetween(window.innerHeight * 0.1, window.innerHeight * 0.9),
      color: COLORS[i % COLORS.length],
      size: randomBetween(6, 14),
      rotate: randomBetween(0, 360),
      rotateEnd: randomBetween(720, 1440) * (Math.random() > 0.5 ? 1 : -1),
      duration: randomBetween(1.2, 2.4),
      shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'rect' : 'star',
    };
  });
};

const Particle = ({ p }) => {
  const isCircle = p.shape === 'circle';
  const isRect = p.shape === 'rect';

  return (
    <motion.div
      initial={{
        x: p.x0, y: p.y0,
        opacity: 1,
        rotate: p.rotate,
        scale: 1,
      }}
      animate={{
        x: p.xEnd,
        y: p.yEnd,
        opacity: 0,
        rotate: p.rotateEnd,
        scale: 0.3,
      }}
      transition={{
        duration: p.duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: 'fixed',
        width: isCircle ? p.size : isRect ? p.size * 1.6 : p.size,
        height: isCircle ? p.size : isRect ? p.size * 0.7 : p.size,
        background: p.color,
        borderRadius: isCircle ? '50%' : isRect ? '2px' : '1px',
        zIndex: 9999,
        pointerEvents: 'none',
        boxShadow: `0 0 6px ${p.color}`,
        clipPath: p.shape === 'star'
          ? 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)'
          : undefined,
      }}
    />
  );
};

const ConfettiBurst = ({ trigger }) => {
  const [particles, setParticles] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setParticles(generateParticles(90));
      setKey(k => k + 1);
    }
  }, [trigger]);

  if (!trigger || particles.length === 0) return null;

  return (
    <AnimatePresence>
      <div key={key} style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
        {particles.map(p => <Particle key={p.id} p={p} />)}
      </div>
    </AnimatePresence>
  );
};

export default ConfettiBurst;
