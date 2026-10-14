import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { makeT } from '../i18n.js';
import { LEVELS } from '../data/index.js';

const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🦄', '🐙', '🦉', '🐰'];

export default function Onboarding() {
  const { state, updateProfile } = useApp();
  const [lang, setLang] = useState(state.profile.lang);
  const [level, setLevel] = useState(state.profile.level);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(state.profile.avatar);
  const t = makeT(lang);

  const start = () => updateProfile({ lang, level, avatar, name: name.trim(), onboarded: true });

  return (
    <div className="onboarding">
      <motion.div
        className="hero-owl"
        animate={{ y: [0, -12, 0], rotate: [0, -4, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        🦉
      </motion.div>
      <h1 className="brand">{t('appName')}</h1>
      <p className="muted">{t('tagline')}</p>

      <section className="card">
        <h3>{t('chooseLang')}</h3>
        <div className="seg">
          {[['id', '🇮🇩 Indonesia'], ['en', '🇬🇧 English']].map(([id, label]) => (
            <button key={id} className={lang === id ? 'on' : ''} onClick={() => setLang(id)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>{t('chooseLevel')}</h3>
        <div className="level-grid">
          {LEVELS.map((lv) => (
            <motion.button
              key={lv.id}
              whileTap={{ scale: 0.95 }}
              className={`level-pick ${level === lv.id ? 'on' : ''}`}
              onClick={() => setLevel(lv.id)}
            >
              <span className="level-emoji">{lv.icon}</span>
              <strong>{t(lv.nameKey)}</strong>
              <small>{t(lv.subKey)}</small>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>{t('pickAvatar')}</h3>
        <div className="avatars">
          {AVATARS.map((a) => (
            <motion.button
              key={a}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              className={avatar === a ? 'on' : ''}
              onClick={() => setAvatar(a)}
            >
              {a}
            </motion.button>
          ))}
        </div>
        <input
          className="text-input"
          value={name}
          maxLength={20}
          placeholder={t('namePlaceholder')}
          aria-label={t('yourName')}
          onChange={(e) => setName(e.target.value)}
        />
      </section>

      <motion.button whileTap={{ scale: 0.97 }} className="btn primary big" onClick={start}>
        {t('start')}
      </motion.button>
    </div>
  );
}
