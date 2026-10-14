import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { BADGES } from '../data/badges.js';
import { ALL_LESSONS } from '../data/index.js';
import { effectiveStreak, playerLevel } from '../store.js';

function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}>
      <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
    </button>
  );
}

export default function Profile() {
  const { state, t, tr, updateProfile, reset, go } = useApp();
  const { profile } = state;
  const { level } = playerLevel(state.xp);
  const stars = Object.values(state.lessons).reduce((s, l) => s + (l.stars || 0), 0);
  const done = Object.values(state.lessons).filter((l) => l.stars > 0).length;
  const earned = BADGES.filter((b) => state.badges[b.id]).length;

  return (
    <div className="profile">
      <div className="profile-head">
        <motion.div className="avatar huge" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>{profile.avatar}</motion.div>
        <h2>{profile.name || t('appName')}</h2>
        <div className="muted">{t('level')} {level}</div>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><span>⚡</span><b>{state.xp}</b><small>{t('xp')}</small></div>
        <div className="stat-card"><span>🔥</span><b>{effectiveStreak(state)}</b><small>{t('streak')}</small></div>
        <div className="stat-card"><span>⭐</span><b>{stars}</b><small>{t('stars')}</small></div>
        <div className="stat-card"><span>📘</span><b>{done}/{ALL_LESSONS.length}</b><small>{t('lessons')}</small></div>
      </div>

      <section className="card">
        <h3>{t('badges')} <span className="muted small">{earned}/{BADGES.length}</span></h3>
        <div className="badge-grid">
          {BADGES.map((b, i) => {
            const got = !!state.badges[b.id];
            return (
              <motion.div
                key={b.id}
                className={`badge-tile ${got ? 'got' : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                title={tr(b.desc)}
              >
                <span className="badge-big">{got ? b.icon : '🔒'}</span>
                <strong>{tr(b.name)}</strong>
                <small>{tr(b.desc)}</small>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h3>{t('settings')}</h3>
        <div className="row">
          <span>{t('language')}</span>
          <div className="seg small">
            {[['id', 'ID'], ['en', 'EN']].map(([id, label]) => (
              <button key={id} className={profile.lang === id ? 'on' : ''} onClick={() => updateProfile({ lang: id })}>{label}</button>
            ))}
          </div>
        </div>
        <div className="row"><span>{t('sound')}</span><Toggle on={profile.sound} onChange={(v) => updateProfile({ sound: v })} label={t('sound')} /></div>
        <div className="row"><span>{t('voice')}</span><Toggle on={profile.voice} onChange={(v) => updateProfile({ voice: v })} label={t('voice')} /></div>
        <div className="row">
          <span>{t('changeLevel')}</span>
          <button className="btn small ghost" onClick={() => go('home')}>{t('home')} →</button>
        </div>
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
