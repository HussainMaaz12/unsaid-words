import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STICKERS = [
  { src: '/assets/images/cat1.gif', size: 65 },
  { src: '/assets/images/teddy.png', size: 60 },
  { src: '/assets/images/heart1.gif', size: 48 },
  { src: '/assets/images/heart2.gif', size: 48 },
  { src: '/assets/images/mail.gif', size: 55 },
  { src: '/assets/images/heart1.gif', size: 42 },
];

const Sticker = ({ src, size, startX, startY, delay }) => {
  return (
    <motion.img
      src={src}
      alt="sticker"
      style={{
        position: 'fixed',
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        userSelect: 'none',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
        y: [0, -60, -120, -180],
        x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
        rotate: [0, 15, -10, 5],
        scale: [0.5, 1, 0.9, 0.5],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: Math.random() * 3,
      }}
    />
  );
};

const FloatingStickers = () => {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const placed = STICKERS.map((s, i) => ({
      ...s,
      id: i,
      startX: 5 + Math.random() * 88, // 5% to 93%
      startY: 60 + Math.random() * 35, // start from bottom area
      delay: i * 0.8,
    }));
    setStickers(placed);
  }, []);

  return (
    <div className="floating-sticker-layer" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stickers.map((s) => (
        <Sticker key={s.id} {...s} />
      ))}
    </div>
  );
};

export default FloatingStickers;
