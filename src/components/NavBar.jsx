import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';

export default function NavBar({ screen }) {
  const { t, go } = useApp();
  const items = [
    { id: 'home', icon: '🏠', label: t('home') },
    { id: 'profile', icon: '🏆', label: t('profile') },
  ];
  return (
    <nav className="navbar">
      {items.map((it) => (
        <motion.button
          key={it.id}
          whileTap={{ scale: 0.92 }}
          className={`nav-item ${screen === it.id ? 'active' : ''}`}
          onClick={() => go(it.id)}
        >
          <span className="nav-icon">{it.icon}</span>
          <span>{it.label}</span>
        </motion.button>
      ))}
    </nav>
  );
}
