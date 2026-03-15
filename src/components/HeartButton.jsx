import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeartButton = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate(to)}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 12px 35px rgba(255, 77, 109, 0.55)',
        y: -3,
      }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', delay: 0.5 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '15px 40px',
        borderRadius: '50px',
        background: 'linear-gradient(135deg, #ff4d6d, #ff85a1)',
        color: 'white',
        fontSize: '1.15rem',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        cursor: 'pointer',
        boxShadow: '0 8px 28px rgba(255, 77, 109, 0.35)',
        backdropFilter: 'blur(10px)',
        letterSpacing: '0.5px',
        marginTop: '35px',
      }}
    >
      {children}
    </motion.button>
  );
};

export default HeartButton;
