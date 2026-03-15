import React from 'react';

// Multi-prime noise — produces truly irregular scatter, no visible sequence
const seededRandom = (seed) => {
  let s = seed;
  s = ((s >>> 16) ^ s) * 0x45d9f3b;
  s = ((s >>> 16) ^ s) * 0x45d9f3b;
  s = (s >>> 16) ^ s;
  return (s >>> 0) / 0xffffffff;
};

const STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  x: (seededRandom(i * 7919 + 1) * 100).toFixed(2),
  y: (seededRandom(i * 6271 + 3) * 100).toFixed(2),
  size: [1.4, 0.8, 1.0, 0.6, 1.2, 0.7, 0.9][i % 7],
  delay: (seededRandom(i * 3571 + 7) * 5).toFixed(2),
  duration: (2.8 + seededRandom(i * 4219 + 5) * 2.5).toFixed(1),
  color: i % 9 === 0 ? '#ffd6e0' : i % 9 === 1 ? '#ffe8b5' : '#ffffff',
}));

const OrbsBackground = () => {
  return (
    <>
      <style>{`
        @keyframes orb1 {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(18vw, 12vh) scale(1.3); }
          66%  { transform: translate(-8vw, 25vh) scale(0.92); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes orb2 {
          0%   { transform: translate(0, 0) scale(1.1); }
          33%  { transform: translate(-20vw, -8vh) scale(0.88); }
          66%  { transform: translate(12vw, 18vh) scale(1.2); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        @keyframes orb3 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(8vw, -18vh) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Gentle twinkle — low opacity range for soft look */
        @keyframes twinkle {
          0%, 100% { opacity: 0.08; transform: scale(0.9); }
          50%       { opacity: 0.65; transform: scale(1.2); }
        }

        .star {
          position: absolute;
          border-radius: 50%;
          animation: twinkle var(--dur) ease-in-out var(--delay) infinite;
          pointer-events: none;
          will-change: opacity;
        }
      `}</style>

      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: -2, overflow: 'hidden',
        /* Soft, warm romantic dark — not pitch black, has life in it */
        background: 'linear-gradient(160deg, #2c1a3e 0%, #3d1a2e 40%, #2a1535 70%, #1e1030 100%)',
      }}>

        {/* Soft warm orbs — reduced opacity so they don't overpower */}
        <div style={{
          position: 'absolute', top: '0%', left: '10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(220,80,110,0.22) 0%, transparent 68%)',
          borderRadius: '50%', filter: 'blur(70px)',
          animation: 'orb1 30s ease-in-out infinite', willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '0%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(160,80,200,0.18) 0%, transparent 68%)',
          borderRadius: '50%', filter: 'blur(80px)',
          animation: 'orb2 35s ease-in-out infinite', willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '20%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(230,120,150,0.18) 0%, transparent 68%)',
          borderRadius: '50%', filter: 'blur(65px)',
          animation: 'orb3 25s ease-in-out infinite', willChange: 'transform',
        }} />

        {/* ── Soft star field ── */}
        {STARS.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              '--dur': `${s.duration}s`,
              '--delay': `${s.delay}s`,
              /* Tiny soft glow — not a harsh bright dot */
              boxShadow: `0 0 ${s.size + 1}px ${s.size * 0.8}px ${s.color}55`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default OrbsBackground;
