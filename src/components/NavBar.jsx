import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import Avatar from './Avatar.jsx';

// Sidebar on wide screens, bottom bar on phones (same markup, styled by CSS).
export default function NavBar({ screen }) {
  const { t, go, state } = useApp();
  const items = [
    { id: 'home', icon: 'home', label: t('home') },
    { id: 'profile', icon: 'chart', label: t('profile') },
  ];
  return (
    <nav className="navbar" aria-label="Main">
      <div className="nav-brand">
        <Logo withText text={t('appName')} />
      </div>
      <div className="nav-items">
        {items.map((it) => (
          <motion.button
            key={it.id}
            whileTap={{ scale: 0.96 }}
            className={`nav-item ${screen === it.id ? 'active' : ''}`}
            aria-current={screen === it.id ? 'page' : undefined}
            onClick={() => go(it.id)}
          >
            <Icon name={it.icon} size={22} />
            <span>{it.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="nav-user">
        <Avatar color={state.profile.avatar} name={state.profile.name} size={36} />
        <div>
          <div className="nav-user-name">{state.profile.name || t('appName')}</div>
          <div className="muted tiny">{state.xp} {t('xp')}</div>
        </div>
      </div>
    </nav>
  );
}
