import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import HeartButton from '../components/HeartButton';

const Apology = () => {
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const handlePlay = async () => {
    setVideoStarted(true);
    try {
      await videoRef.current?.play();
    } catch (err) {
      // Autoplay blocked — native controls are now visible so user can press play
    }
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
        maxWidth: '720px',
        textAlign: 'center',
        padding: '20px 16px 60px 16px',
        boxSizing: 'border-box',
      }}>

        {/* Animated header emoji */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '12px' }}
        >
          💌
        </motion.div>

        {/* Main letter glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            padding: 'clamp(20px, 4vw, 40px) clamp(18px, 5vw, 45px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            background: 'rgba(20, 8, 30, 0.65)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 77, 109, 0.35)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,77,109,0.1)',
            marginBottom: '35px',
            width: '100%',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            fontFamily: 'Playfair Display, serif',
            color: '#ff4d6d',
            margin: 0,
          }}>
            I'm Sorry
          </h2>

          <p style={{ fontSize: '1.2rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            There are so many things left unsaid. <br />
            I couldn't say them directly, so I built this space for them.
          </p>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.85, fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            I hope this brought a tiny bit of joy to your day. <br />
            You deserve all the stars in the sky. 🌟
          </p>
        </motion.div>

        {/* ─── Video Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            width: '100%',
            borderRadius: '22px',
            overflow: 'hidden',
            background: '#000',
            border: '1px solid rgba(255, 77, 109, 0.45)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 50px rgba(255,77,109,0.2)',
            position: 'relative',
          }}
        >
          {/* Glow accent line on top */}
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '70%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #ff4d6d, transparent)',
            boxShadow: '0 0 20px 5px rgba(255,77,109,0.5)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />

          {/*
            KEY FIXES:
            - objectFit: 'contain' — shows the full video without cropping (preserves quality)
            - preload: 'auto' — tells browser to fully buffer the video for smooth playback
            - controls shown only after user clicks (cleaner UX)
          */}
          <video
            ref={videoRef}
            src="/assets/videos/3.mp4"
            style={{
              width: '100%',
              display: 'block',
              maxHeight: '70vh',
              objectFit: 'contain',
              background: '#000',
            }}
            loop
            playsInline
            preload="auto"
            controls={videoStarted}
          />

          {/* Glowing Play overlay — shown before first tap */}
          {!videoStarted && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePlay}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5, 0, 15, 0.55)',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 90, height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff4d6d, #ff85a1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(255,77,109,0.8)',
                }}
              >
                <span style={{ fontSize: '2.2rem', marginLeft: '6px' }}>▶</span>
              </motion.div>
              <p style={{
                color: '#fff',
                marginTop: '18px',
                fontSize: '1.15rem',
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              }}>
                Play Our Moment 🎬
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer gif */}
        <motion.div
          style={{ marginTop: '40px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <img
            src="/assets/images/dating.gif"
            alt="Cute moment"
            style={{ width: '130px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}
          />
        </motion.div>

        <HeartButton to="/feelings">
          One more thing... 🥀
        </HeartButton>
      </div>
    </PageTransition>
  );
};

export default Apology;
