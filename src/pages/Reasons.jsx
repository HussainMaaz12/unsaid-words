import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import HeartButton from '../components/HeartButton';

const REASONS = [
  { emoji: '✨', title: "You're Magic", text: "You make the ordinary moments feel like magic." },
  { emoji: '☀️', title: 'Your Smile', text: "Your smile can light up my darkest days without even trying." },
  { emoji: '😂', title: 'You Make Me Laugh', text: "You always know how to make me laugh, even when I'm trying to be serious." },
  { emoji: '🤍', title: 'Your Kindness', text: 'Your kindness and empathy inspire me every single day.' },
  { emoji: '📸', title: 'Our Memories', text: "I cherish every memory we've created together, even the silly ones." },
  { emoji: '🌙', title: 'Just You', text: "Just knowing you are in my life gives me peace I can't explain." },
];

// How the back cards peek out beneath
const STACK_OFFSETS = [
  { y: 0,   rotate: 0,    scale: 1,    zIndex: 10 }, // current
  { y: 10,  rotate: 2,  scale: 0.97,  zIndex: 9  }, // 1 behind
  { y: 18,  rotate: -1.5, scale: 0.94,  zIndex: 8  }, // 2 behind
  { y: 24,  rotate: 1,  scale: 0.91,  zIndex: 7  }, // 3+ behind
];

const Reasons = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = swipe left, -1 = swipe right
  const [done, setDone] = useState(false);

  const handleNext = () => {
    if (currentIndex < REASONS.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    } else {
      setDone(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  };

  // Cards visible in the stack (current + up to 3 behind)
  const visibleCards = REASONS.slice(currentIndex).slice(0, 4);

  return (
    <PageTransition>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '30px 20px 100px 20px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
            marginBottom: '12px',
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 2px 20px rgba(255, 77, 109, 0.6)',
          }}
        >
          Just a Few Thoughts... 💭
        </motion.h2>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '40px' }}
        >
          {done ? 'All done 💖' : `${currentIndex + 1} of ${REASONS.length} — Tap to continue`}
        </motion.p>

        {/* Card Stack */}
        <AnimatePresence mode="popLayout">
          {!done ? (
            <div
              onClick={handleNext}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                height: '300px',
                cursor: 'pointer',
              }}
            >
              {/* Render back cards first (static, no animation) */}
              {visibleCards.slice(1).reverse().map((card, i) => {
                const offsetIdx = visibleCards.slice(1).length - 1 - i + 1;
                const offset = STACK_OFFSETS[Math.min(offsetIdx, STACK_OFFSETS.length - 1)];
                return (
                  <div
                    key={REASONS.indexOf(card)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      background: 'rgba(255, 255, 255, 0.07)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      transform: `translateY(${offset.y}px) rotate(${offset.rotate}deg) scale(${offset.scale})`,
                      transformOrigin: 'bottom center',
                      zIndex: offset.zIndex,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                );
              })}

              {/* Top (current) card — animated */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: direction * 320, opacity: 0, rotate: direction * 12 }}
                  animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ x: direction * -340, opacity: 0, rotate: direction * -10, transition: { duration: 0.32 } }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '24px',
                    background: 'rgba(30, 10, 40, 0.75)',
                    backdropFilter: 'blur(22px)',
                    border: '1px solid rgba(255, 77, 109, 0.4)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,77,109,0.15)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 35px',
                    gap: '18px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {/* Emoji */}
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: '3.5rem', lineHeight: 1 }}
                  >
                    {REASONS[currentIndex].emoji}
                  </motion.span>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      fontSize: '1.5rem',
                      color: '#ff4d6d',
                      fontFamily: 'Playfair Display, serif',
                      margin: 0,
                    }}
                  >
                    {REASONS[currentIndex].title}
                  </motion.h3>

                  {/* Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    style={{
                      fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.88)',
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {REASONS[currentIndex].text}
                  </motion.p>

                  {/* Tap hint */}
                  <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', margin: 0, marginTop: '4px' }}
                  >
                    {currentIndex < REASONS.length - 1 ? '↩ Tap for next' : '↩ Tap to finish'}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* All cards done — show completion */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              style={{
                width: '100%',
                maxWidth: '420px',
                borderRadius: '24px',
                padding: '50px 35px',
                textAlign: 'center',
                background: 'rgba(30, 10, 40, 0.75)',
                backdropFilter: 'blur(22px)',
                border: '1px solid rgba(255, 77, 109, 0.4)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💖</div>
              <h3 style={{
                fontSize: '1.8rem',
                fontFamily: 'Playfair Display, serif',
                color: '#ff4d6d',
                margin: '0 0 12px 0',
              }}>
                That's just the beginning.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>
                There are a thousand more reasons,<br />but these are my favorites.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back button - subtle */}
        {currentIndex > 0 && !done && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePrev}
            style={{
              marginTop: '20px',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            ← go back
          </motion.button>
        )}

        {done && (
          <HeartButton to="/music">
            Next: A Special Song 🎵
          </HeartButton>
        )}
      </div>
    </PageTransition>
  );
};

export default Reasons;
