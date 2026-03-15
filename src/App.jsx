import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Puzzle from './pages/Puzzle';
import Reasons from './pages/Reasons';
import Music from './pages/Music';
import Apology from './pages/Apology';
import Feelings from './pages/Feelings';
import OrbsBackground from './components/OrbsBackground';
import FloatingStickers from './components/FloatingStickers';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/reasons" element={<Reasons />} />
        <Route path="/music" element={<Music />} />
        <Route path="/apology" element={<Apology />} />
        <Route path="/feelings" element={<Feelings />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <OrbsBackground />
      <FloatingStickers />
      <div className="app-container">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
