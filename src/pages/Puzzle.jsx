import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import HeartButton from '../components/HeartButton';
import ConfettiBurst from '../components/ConfettiBurst';

const IMAGES = [
  '/assets/images/1.jpeg',
  '/assets/images/2.jpeg',
  '/assets/images/4.jpeg',
  '/assets/images/img1.jpeg',
  '/assets/images/img2.jpeg',
  '/assets/images/img3.jpeg',
];

const WIN_MESSAGE = "Every picture holds a memory, but you are my favorite one. 💖";

const Puzzle = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const shuffled = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, isFlipped: false, isMatched: false }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (isChecking || flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = cards.map((c, i) => i === index ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [a, b] = newFlipped;
      if (newCards[a].image === newCards[b].image) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, isMatched: true } : c));
          setFlippedIndices([]);
          setIsChecking(false);
          const newCount = matchedCount + 1;
          setMatchedCount(newCount);
          if (newCount === IMAGES.length) {
            setTimeout(() => setGameWon(true), 600);
          }
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, isFlipped: false } : c));
          setFlippedIndices([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  const openEnvelope = () => {
    setEnvelopeOpened(true);
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(WIN_MESSAGE.substring(0, i + 1));
      i++;
      if (i >= WIN_MESSAGE.length) clearInterval(interval);
    }, 55);
  };

  return (
    <PageTransition>
      {/* 🎉 Party popper burst fires when all pairs are matched */}
      <ConfettiBurst trigger={gameWon} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        minHeight: '100vh',
        padding: '30px 20px 100px 20px',
        boxSizing: 'border-box',
      }}>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '2.4rem',
            marginBottom: '30px',
            color: '#fff',
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 2px 20px rgba(255, 77, 109, 0.6)',
            textAlign: 'center'
          }}
        >
          Match the Memories ✨
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '560px',
        }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
              style={{
                width: '100%',
                aspectRatio: '3/4',
                position: 'relative',
                transformStyle: 'preserve-3d',
                cursor: card.isMatched ? 'default' : 'pointer',
              }}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 250, damping: 22 }}
            >
              {/* Back */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.8rem' }}>💖</span>
              </div>

              {/* Front */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: card.isMatched ? '2px solid #ff4d6d' : '1px solid rgba(255,255,255,0.4)',
                boxShadow: card.isMatched ? '0 0 18px rgba(255,77,109,0.7)' : 'none',
              }}>
                <img src={card.image} alt="memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Win Modal - perfectly centered */}
        <AnimatePresence>
          {gameWon && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed', inset: 0, zIndex: 50,
                  background: 'rgba(10, 5, 15, 0.7)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 40 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{
                    padding: '50px 40px',
                    width: '90%',
                    maxWidth: '520px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'rgba(25, 10, 35, 0.85)',
                    border: '1px solid rgba(255, 77, 109, 0.5)',
                    borderRadius: '28px',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(255,77,109,0.25)',
                  }}
                >
                  {!envelopeOpened ? (
                    <motion.div
                      animate={{ rotate: [-4, 4] }}
                      transition={{ repeat: Infinity, duration: 1.8, repeatType: 'reverse' }}
                      style={{ cursor: 'pointer' }}
                      onClick={openEnvelope}
                    >
                      <div style={{ fontSize: '7rem', textShadow: '0 0 40px rgba(255,77,109,0.9)', lineHeight: 1 }}>
                        💌
                      </div>
                      <p style={{ color: '#ffd166', fontWeight: 700, fontSize: '1.2rem', marginTop: '20px' }}>
                        Tap to Reveal Your Message
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <p style={{
                        fontSize: '1.6rem',
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        color: '#fff',
                        lineHeight: 1.7,
                        minHeight: '80px',
                        textShadow: '0 2px 5px rgba(0,0,0,0.4)',
                      }}>
                        {typedMessage}
                      </p>
                      <HeartButton to="/reasons">
                        Continue → Reasons 💭
                      </HeartButton>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Puzzle;
