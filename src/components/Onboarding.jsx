import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { makeT } from '../i18n.js';
import { AVATAR_COLORS } from '../avatars.js';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

export default function Onboarding() {
  const { state, updateProfile } = useApp();
  const [lang, setLang] = useState(state.profile.lang);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(state.profile.avatar);
  const t = makeT(lang);

  const start = () => updateProfile({ lang, avatar, name: name.trim(), onboarded: true });
  const features = [
    ['bolt', t('featXp')],
    ['flame', t('featStreak')],
    ['book', t('featTracks')],
    ['medal', t('featBadges')],
  ];

  return (
    <div className="onboarding">
      <aside className="ob-hero">
        <Logo size={44} withText text={t('appName')} />
        <span className="level-pill">{t('levelCode')} · {t('level')}</span>
        <h1>{t('tagline')}</h1>
        <p>{t('brandSub')}</p>
        <ul>
          {features.map(([icon, label], i) => (
            <motion.li key={icon} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
              <span className="feat-icon"><Icon name={icon} size={18} /></span>
              {label}
            </motion.li>
          ))}
        </ul>
      </aside>

      <div className="ob-form">
        <h2>{t('welcome')}</h2>

        <section className="field">
          <label>{t('chooseLang')}</label>
          <div className="seg">
            {[['id', 'Bahasa Indonesia'], ['en', 'English']].map(([id, label]) => (
              <button key={id} className={lang === id ? 'on' : ''} onClick={() => setLang(id)}>{label}</button>
            ))}
          </div>
        </section>

        <section className="field">
          <label htmlFor="name">{t('yourName')}</label>
          <div className="name-row">
            <Avatar color={avatar} name={name} size={48} />
            <input id="name" className="text-input" value={name} maxLength={20} placeholder={t('namePlaceholder')} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="swatches" role="radiogroup" aria-label={t('colorLabel')}>
            {AVATAR_COLORS.map(([a, b], i) => (
              <motion.button
                key={i}
                role="radio"
                aria-checked={avatar === String(i)}
                aria-label={`${t('colorLabel')} ${i + 1}`}
                whileTap={{ scale: 0.88 }}
                whileHover={{ scale: 1.08 }}
                className={avatar === String(i) ? 'on' : ''}
                style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
                onClick={() => setAvatar(String(i))}
              />
            ))}
          </div>
        </section>

        <motion.button whileTap={{ scale: 0.98 }} className="btn primary big" onClick={start}>
          {t('start')} <Icon name="arrow" size={18} />
        </motion.button>
      </div>
    </div>
  );
}
