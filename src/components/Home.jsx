import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { LEVELS } from '../data/index.js';
import { DAILY_GOAL, dailyXp, effectiveStreak, playerLevel, XP_PER_LEVEL } from '../store.js';

function Ring({ value, max, children }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="ring">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} className="ring-bg" />
        <motion.circle
          cx="32" cy="32" r={r}
          className="ring-fg"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className="ring-label">{children}</span>
    </div>
  );
}

function Stars({ n }) {
  return (
    <span className="stars" aria-label={`${n}/3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= n ? 'on' : ''}>★</span>
      ))}
    </span>
  );
}

export default function Home() {
  const { state, t, tr, openLesson, updateProfile, kids } = useApp();
  const [shake, setShake] = useState(null);
  const { profile } = state;
  const level = LEVELS.find((l) => l.id === profile.level) || LEVELS[1];
  const { level: plvl, into } = playerLevel(state.xp);
  const today = dailyXp(state);
  const streak = effectiveStreak(state);
  const done = Object.values(state.lessons).filter((l) => l.stars > 0).length;

  return (
    <div className="home">
      <header className="top">
        <div className="who">
          <motion.span className="avatar" animate={{ rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}>
            {profile.avatar}
          </motion.span>
          <div>
            <div className="hello">{t('hello')}{profile.name ? `, ${profile.name}` : ''}!</div>
            <div className="muted small">{t('level')} {plvl} · {state.xp} {t('xp')}</div>
          </div>
        </div>
        <div className="stat-row">
          <motion.div className="chip fire" whileTap={{ scale: 0.9 }}>
            <motion.span animate={streak > 0 ? { scale: [1, 1.25, 1] } : {}} transition={{ repeat: Infinity, duration: 1.6 }}>🔥</motion.span>
            <b>{streak}</b>
          </motion.div>
        </div>
      </header>

      <section className="card goal">
        <Ring value={today} max={DAILY_GOAL}>{Math.min(today, DAILY_GOAL)}</Ring>
        <div className="goal-text">
          <strong>{today >= DAILY_GOAL ? `🎉 ${t('goalDone')}` : t('dailyGoal')}</strong>
          <div className="muted small">{Math.min(today, DAILY_GOAL)}/{DAILY_GOAL} {t('xp')}</div>
          <div className="bar"><motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} transition={{ duration: 0.8 }} /></div>
          <div className="muted tiny">{t('level')} {plvl} → {plvl + 1}</div>
        </div>
      </section>

      <div className="tabs" role="tablist">
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            role="tab"
            aria-selected={lv.id === level.id}
            className={`tab ${lv.id === level.id ? 'on' : ''}`}
            onClick={() => updateProfile({ level: lv.id })}
          >
            <span>{lv.icon}</span> {t(lv.nameKey)}
          </button>
        ))}
      </div>
      <div className="muted small center">{t(level.subKey)} · {done} {t('lessonsDone')}</div>

      <ol className="path">
        {level.lessons.map((lesson, i) => {
          const prev = level.lessons[i - 1];
          const unlocked = i === 0 || state.lessons[prev.id]?.stars > 0;
          const rec = state.lessons[lesson.id];
          const current = unlocked && !rec?.stars;
          const offset = [0, 38, 0, -38][i % 4];
          return (
            <motion.li
              key={lesson.id}
              className="path-item"
              style={{ marginLeft: offset }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 220, damping: 16 }}
            >
              <motion.button
                className={`node ${unlocked ? '' : 'locked'} ${rec?.stars ? 'done' : ''} ${current ? 'current' : ''}`}
                whileHover={unlocked ? { scale: 1.08 } : {}}
                whileTap={{ scale: 0.92 }}
                animate={shake === lesson.id ? { x: [0, -8, 8, -6, 6, 0] } : current ? { y: [0, -6, 0] } : {}}
                transition={current && shake !== lesson.id ? { repeat: Infinity, duration: 1.6 } : { duration: 0.4 }}
                onClick={() => {
                  if (unlocked) openLesson(lesson.id);
                  else {
                    setShake(lesson.id);
                    setTimeout(() => setShake(null), 450);
                  }
                }}
                aria-label={tr(lesson.title)}
              >
                <span className="node-icon">{unlocked ? lesson.icon : '🔒'}</span>
              </motion.button>
              <div className="node-label">
                <strong>{tr(lesson.title)}</strong>
                {rec?.stars ? <Stars n={rec.stars} /> : <span className="muted tiny">{unlocked ? (kids ? '▶' : t('startLesson')) : t('locked')}</span>}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
