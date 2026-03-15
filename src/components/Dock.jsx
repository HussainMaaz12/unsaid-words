import React from 'react';
import { motion } from 'framer-motion';
import { Home, Puzzle, Heart, Music, MessageCircleHeart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dock = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: '/', icon: Home, label: 'Home' },
    { id: '/puzzle', icon: Puzzle, label: 'Puzzle' },
    { id: '/reasons', icon: Heart, label: 'Reasons' },
    { id: '/music', icon: Music, label: 'Music' },
    { id: '/apology', icon: MessageCircleHeart, label: 'Letter' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      gap: '15px',
      padding: '12px 25px',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.id;
        const Icon = item.icon;

        return (
          <motion.button
            key={item.id}
            onClick={() => navigate(item.id)}
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'relative',
              background: isActive ? 'rgba(255, 77, 109, 0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(255, 77, 109, 0.5)' : '1px solid transparent',
              padding: '12px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isActive ? '#ff4d6d' : '#555',
              transition: 'all 0.3s ease',
              boxShadow: isActive ? '0 5px 15px rgba(255, 77, 109, 0.3)' : 'none'
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && (
              <motion.div
                layoutId="active-dot"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#ff4d6d',
                  boxShadow: '0 0 8px #ff4d6d'
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Dock;
