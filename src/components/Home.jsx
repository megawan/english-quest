import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { TRACKS } from '../data/b2.js';
import { DAILY_GOAL, dailyXp, effectiveStreak, playerLevel, rankIndex, XP_PER_LEVEL } from '../store.js';
import Icon from './Icon.jsx';
import Stars from './Stars.jsx';

function Ring({ value, max, size = 84, stroke = 8, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          className="ring-fg" strokeWidth={stroke}
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-label">{children}</span>
    </div>
  );
}

export default function Home() {
  const { state, t, tr, openLesson } = useApp();
  const { profile } = state;
  const { level: plvl, into } = playerLevel(state.xp);
  const ranks = t('ranks');
  const today = dailyXp(state);
  const streak = effectiveStreak(state);
  const doneOf = (track) => track.lessons.filter((l) => state.lessons[l.id]?.stars > 0).length;
  const totalDone = TRACKS.reduce((n, tr2) => n + doneOf(tr2), 0);
  const totalAll = TRACKS.reduce((n, tr2) => n + tr2.lessons.length, 0);

  return (
    <div className="home">
      <header className="page-head">
        <div>
          <p className="eyebrow">{t('hello')}{profile.name ? `, ${profile.name}` : ''} · {t('levelCode')} {t('level')}</p>
          <h1>{t('homeTitle')}</h1>
          <p className="muted">{totalDone}/{totalAll} {t('lessonsDone')}</p>
        </div>
      </header>

      <div className="home-grid">
        <aside className="rail">
          <section className="panel goal">
            <Ring value={Math.min(today, DAILY_GOAL)} max={DAILY_GOAL}>
              <b>{Math.min(today, DAILY_GOAL)}</b>
              <small>/{DAILY_GOAL}</small>
            </Ring>
            <div className="goal-text">
              <strong>{today >= DAILY_GOAL ? t('goalDone') : t('dailyGoal')}</strong>
              <p className="muted small">{t('goalTip')}</p>
            </div>
          </section>

          <section className="panel stats">
            <div className="stat">
              <span className="stat-ico fire"><Icon name="flame" size={18} fill /></span>
              <div><b>{streak}</b><small>{t('streak')}</small></div>
            </div>
            <div className="stat">
              <span className="stat-ico xp"><Icon name="bolt" size={18} fill /></span>
              <div><b>{state.xp}</b><small>{t('xp')}</small></div>
            </div>
          </section>

          <section className="panel levelbar">
            <div className="row-between">
              <div>
                <p className="eyebrow">{t('rank')} {plvl}</p>
                <strong>{ranks[rankIndex(plvl, ranks.length)]}</strong>
              </div>
              <span className="muted small">{into}/{XP_PER_LEVEL} {t('xp')}</span>
            </div>
            <div className="bar"><motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} transition={{ duration: 0.9 }} /></div>
          </section>
        </aside>

        <div className="tracks">
          {TRACKS.map((track, ti) => {
            const done = doneOf(track);
            const nextIdx = track.lessons.findIndex((l) => !(state.lessons[l.id]?.stars > 0));
            return (
              <motion.section key={track.id} className="track" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ti * 0.06 }}>
                <div className="track-head">
                  <span className="track-ico"><Icon name={track.icon} size={22} /></span>
                  <div className="grow">
                    <h2>{tr(track.title)}</h2>
                    <p className="muted small">{tr(track.desc)}</p>
                  </div>
                  <span className="track-count">{done}/{track.lessons.length}</span>
                </div>
                <div className="bar slim"><motion.div className="bar-fill" initial={{ width: 0 }} animate={{ width: `${(done / track.lessons.length) * 100}%` }} transition={{ duration: 0.8 }} /></div>

                <ol className="lesson-list">
                  {track.lessons.map((lesson, i) => {
                    const unlocked = i === 0 || state.lessons[track.lessons[i - 1].id]?.stars > 0;
                    const rec = state.lessons[lesson.id];
                    const status = rec?.stars ? 'done' : i === nextIdx ? 'current' : unlocked ? 'open' : 'locked';
                    return (
                      <li key={lesson.id}>
                        <motion.button
                          className={`lesson-card ${status}`}
                          disabled={!unlocked}
                          whileHover={unlocked ? { y: -2 } : {}}
                          whileTap={unlocked ? { scale: 0.985 } : {}}
                          onClick={() => openLesson(lesson.id)}
                        >
                          <span className="lesson-num">
                            {status === 'done' ? <Icon name="check" size={18} strokeWidth={3} /> : status === 'locked' ? <Icon name="lock" size={16} /> : i + 1}
                          </span>
                          <span className="lesson-body">
                            <strong>{tr(lesson.title)}</strong>
                            <span className="muted tiny">
                              {unlocked ? `${lesson.questions.length} ${t('qCount')}` : t('locked')}
                            </span>
                          </span>
                          {rec?.stars ? <Stars n={rec.stars} size={15} /> : status === 'current' ? <span className="go"><Icon name="arrow" size={18} /></span> : null}
                        </motion.button>
                      </li>
                    );
                  })}
                </ol>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
