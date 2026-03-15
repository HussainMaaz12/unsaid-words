import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import HeartButton from '../components/HeartButton';

// Song ID 1 is always index 0 (m4.mp3 per user's update)
const SONGS = [
  { id: 1, title: 'Our First Song', src: '/assets/music/m4.mp3', cover: '/assets/images/img2.jpeg' },
  { id: 2, title: 'Late Night Drives', src: '/assets/music/m2.mp3', cover: '/assets/images/img3.jpeg' },
  { id: 3, title: 'Thinking of You', src: '/assets/music/m3.mp3', cover: '/assets/images/img1.jpeg' },
  { id: 4, title: 'Forever', src: '/assets/music/m1.mp3', cover: '/assets/images/heart1.gif' },
];

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0); // always starts at index 0 = Song ID 1
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => setIsPlaying(p => !p);

  const nextSong = () => {
    setCurrentSong(prev => (prev + 1) % SONGS.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSong(prev => (prev - 1 + SONGS.length) % SONGS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const song = SONGS[currentSong];

  return (
    <PageTransition>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '440px',
        padding: '40px 20px 120px 20px',
        boxSizing: 'border-box',
      }}>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '2.2rem',
            marginBottom: '35px',
            color: '#fff',
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 2px 20px rgba(255, 77, 109, 0.6)',
          }}
        >
          A Melody for You 🎶
        </motion.h2>

        <motion.div
          style={{
            width: '100%',
            padding: '35px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(20, 8, 30, 0.65)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 77, 109, 0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          {/* Spinning Record */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: isPlaying
                ? '0 0 30px rgba(255,77,109,0.7), 0 10px 40px rgba(0,0,0,0.5)'
                : '0 10px 30px rgba(0,0,0,0.3)',
              border: '4px solid rgba(255,77,109,0.5)',
              marginBottom: '28px',
              transition: 'box-shadow 0.5s ease',
            }}
          >
            <img
              src={song.cover}
              alt="Album Cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          {/* Song Info */}
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 5px 0', color: '#fff', fontFamily: 'Playfair Display, serif' }}>
            {song.title}
          </h3>
          <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '25px', fontWeight: 700, letterSpacing: '1px' }}>
            Deepshikha's Playlist
          </p>

          {/* Audio */}
          <audio
            ref={audioRef}
            src={song.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={nextSong}
          />

          {/* Progress Bar */}
          <div style={{
            width: '100%', height: '5px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '3px',
            marginBottom: '30px',
            overflow: 'hidden',
          }}>
            <div style={{ height: '100%', background: 'var(--color-primary)', width: `${progress}%`, transition: 'width 0.3s linear' }} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSong}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', opacity: 0.8 }}
            >
              <SkipBack size={30} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              style={{
                background: 'linear-gradient(135deg, #ff4d6d, #ff85a1)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(255, 77, 109, 0.6)',
              }}
            >
              {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: '4px' }} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSong}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', opacity: 0.8 }}
            >
              <SkipForward size={30} />
            </motion.button>
          </div>
        </motion.div>

        <HeartButton to="/apology">
          One Last Thing... 💌
        </HeartButton>
      </div>
    </PageTransition>
  );
};

export default Music;
