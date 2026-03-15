import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const LYRICS = [
  `Without my baby`,
  `Where are you now when I need you most?\nI gave it all just to hold you close`,
  `Sorry\nthat I broke your heart, your heart`,
  `And I said baby,\nI'll treat you better than I did before,\nI'll hold you down and not let you go,`,
  `This time I won't break your heart`,
  `Your heart, NO`,
];

const Feelings = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [lyricIndex, setLyricIndex] = useState(0);
  const [started, setStarted] = useState(false);

  // Cycle lyrics every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setLyricIndex(i => (i + 1) % LYRICS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    setStarted(true);
    try {
      if (videoRef.current) {
        videoRef.current.currentTime = 20;
        await videoRef.current.play();
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 20;
        await audioRef.current.play();
      }
    } catch (_) { }
  };

  return (
    <PageTransition>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '780px',
        padding: '30px 18px 80px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}>

        {/* Background music — plays on loop */}
        <audio ref={audioRef} src="/assets/music/m5.mp3" loop />

        {/* ── Emotional header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🥀</div>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
            fontFamily: 'Playfair Display, serif',
            color: '#e8a0b4',
            margin: 0,
            textShadow: '0 2px 20px rgba(232, 160, 180, 0.5)',
          }}>
            The Truth I Never Said
          </h2>
        </motion.div>

        {/* ── Side-by-side: Video + Photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '14px',
            width: '100%',
            marginBottom: '28px',
            alignItems: 'stretch',
          }}
        >
          {/* Video */}
          <div style={{
            flex: 1,
            borderRadius: '18px',
            overflow: 'hidden',
            position: 'relative',
            background: '#000',
            border: '1px solid rgba(232, 160, 180, 0.3)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(232,160,180,0.1)',
            minHeight: '200px',
          }}>
            {/* top glow */}
            <div style={{
              position: 'absolute', top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '60%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #e8a0b4, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />

            <video
              ref={videoRef}
              src="/assets/videos/1.mp4"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', background: '#000' }}
              loop
              playsInline
              preload="auto"
              controls={started}
            />

            {/* Play overlay */}
            {!started && (
              <motion.div
                onClick={handleStart}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 3,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(10,5,20,0.6)',
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e8a0b4, #c06b8a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(232,160,180,0.7)',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', marginLeft: '4px' }}>▶</span>
                </motion.div>
                <p style={{ color: '#e8a0b4', marginTop: '10px', fontSize: '0.85rem', fontWeight: 600 }}>
                  Press play 🥀
                </p>
              </motion.div>
            )}
          </div>

          {/* Photo — same height as video */}
          <div style={{
            flex: 1,
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid rgba(232,160,180,0.3)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(232,160,180,0.1)',
          }}>
            <img
              src="/assets/images/img4.jpeg"
              alt="A memory"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* ── Cycling Lyrics ── */}
        <motion.div
          style={{
            width: '100%',
            padding: '28px 30px',
            borderRadius: '20px',
            background: 'rgba(232,160,180,0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,160,180,0.2)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            marginBottom: '16px',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            key={lyricIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              color: '#e8c8d4',
              lineHeight: 1.7,
              margin: 0,
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
            }}
          >
            "{LYRICS[lyricIndex]}"
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', letterSpacing: '1px' }}
        >
          — The Weekend
        </motion.p>
      </div>
    </PageTransition>
  );
};

export default Feelings;
