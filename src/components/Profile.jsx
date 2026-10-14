import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { BADGES } from '../data/badges.js';
import { ALL_LESSONS } from '../data/b2.js';
import { AVATAR_COLORS } from '../avatars.js';
import { effectiveStreak, playerLevel, rankIndex, XP_PER_LEVEL } from '../store.js';
import Icon from './Icon.jsx';
import Avatar from './Avatar.jsx';

function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}>
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 32 }} />
    </button>
  );
}

export default function Profile() {
  const { state, t, tr, updateProfile, reset } = useApp();
  const { profile } = state;
  const { level, into } = playerLevel(state.xp);
  const ranks = t('ranks');
  const stars = Object.values(state.lessons).reduce((s, l) => s + (l.stars || 0), 0);
  const done = Object.values(state.lessons).filter((l) => l.stars > 0).length;
  const earned = BADGES.filter((b) => state.badges[b.id]).length;

  const stats = [
    ['bolt', state.xp, t('xp'), 'xp'],
    ['flame', effectiveStreak(state), t('streak'), 'fire'],
    ['star', stars, t('stars'), 'star'],
    ['book', `${done}/${ALL_LESSONS.length}`, t('lessons'), 'book'],
  ];

  return (
    <div className="profile">
      <header className="profile-head panel">
        <Avatar color={profile.avatar} name={profile.name} size={72} />
        <div className="grow">
          <h1>{profile.name || t('appName')}</h1>
          <p className="muted">{t('rank')} {level} · {ranks[rankIndex(level, ranks.length)]}</p>
          <div className="bar slim"><motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} /></div>
        </div>
      </header>

      <div className="stat-grid">
        {stats.map(([icon, val, label, tone], i) => (
          <motion.div key={label} className="panel stat-tile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <span className={`stat-ico ${tone}`}><Icon name={icon} size={18} fill={icon !== 'book'} /></span>
            <b>{val}</b>
            <small>{label}</small>
          </motion.div>
        ))}
      </div>

      <section className="panel">
        <div className="row-between">
          <h2>{t('badges')}</h2>
          <span className="muted small">{earned}/{BADGES.length}</span>
        </div>
        <div className="badge-grid">
          {BADGES.map((b, i) => {
            const got = !!state.badges[b.id];
            return (
              <motion.div
                key={b.id}
                className={`badge-tile ${got ? 'got' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <span className="badge-ico"><Icon name={got ? b.icon : 'lock'} size={22} /></span>
                <strong>{tr(b.name)}</strong>
                <small>{tr(b.desc)}</small>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <h2>{t('settings')}</h2>
        <div className="row">
          <span>{t('language')}</span>
          <div className="seg compact">
            {[['id', 'Indonesia'], ['en', 'English']].map(([id, label]) => (
              <button key={id} className={profile.lang === id ? 'on' : ''} onClick={() => updateProfile({ lang: id })}>{label}</button>
            ))}
          </div>
        </div>
        <div className="row">
          <span>{t('pickAvatar')}</span>
          <div className="swatches small">
            {AVATAR_COLORS.map(([a, b], i) => (
              <button
                key={i}
                aria-label={`${t('colorLabel')} ${i + 1}`}
                className={profile.avatar === String(i) ? 'on' : ''}
                style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
                onClick={() => updateProfile({ avatar: String(i) })}
              />
            ))}
          </div>
        </div>
        <div className="row"><span>{t('sound')}</span><Toggle on={profile.sound} onChange={(v) => updateProfile({ sound: v })} label={t('sound')} /></div>
        <div className="row"><span>{t('voice')}</span><Toggle on={profile.voice} onChange={(v) => updateProfile({ voice: v })} label={t('voice')} /></div>
        <button
          className="btn danger-outline"
          onClick={() => {
            if (window.confirm(t('resetConfirm'))) reset();
          }}
        >
          {t('resetProgress')}
        </button>
      </section>
      <p className="muted tiny center">{t('footer')}</p>
    </div>
  );
}
