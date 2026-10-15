import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../App.jsx';
import { getLesson } from '../data/levels.js';
import { buildQuestions } from '../data/build.js';
import { speak, hasSpeech } from '../speech.js';
import { playSound } from '../sound.js';
import { shuffle } from '../util.js';
import Icon from './Icon.jsx';
import Stars from './Stars.jsx';
import Guide from './Guide.jsx';

const MAX_HEARTS = 5;
const CONFETTI_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9'];

function Speaker({ text, slow, big }) {
  const { state } = useApp();
  if (!state.profile.voice || !hasSpeech() || !text) return null;
  return (
    <motion.button
      type="button"
      className={`speaker ${big ? 'big' : ''}`}
      whileTap={{ scale: 0.9 }}
      onClick={() => speak(text, { slow })}
      aria-label="Listen"
    >
      <Icon name="volume" size={big ? 34 : 20} />
    </motion.button>
  );
}

function Passage({ text, gap }) {
  const parts = text.split(/(\(\d\)___)/g);
  return (
    <blockquote className="passage">
      {parts.map((part, i) => {
        const m = part.match(/^\((\d)\)___$/);
        if (!m) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <span key={i} className={`gap-mark ${Number(m[1]) === gap ? 'active' : ''}`}>
            {m[1]}
          </span>
        );
      })}
    </blockquote>
  );
}

function ChoiceQuestion({ q, selected, onSelect, locked, result, tr, t }) {
  return (
    <div className="q-body">
      <div className="stem">
        {q.stem.passage && <Passage text={q.stem.passage} gap={q.stem.gap} />}
        {q.stem.gap && <div className="stem-text small-stem">{t('gap')} {q.stem.gap}</div>}
        {q.stem.text && (
          <div className={`stem-text ${q.stem.passage ? 'small-stem' : ''}`}>
            {tr(q.stem.text)}
            {!q.stem.passage && <Speaker text={q.stem.speak} />}
          </div>
        )}
      </div>

      <div className="options">
        {q.options.map((o, i) => {
          const cls = locked ? (i === q.answerIdx ? 'right' : i === selected ? 'wrong' : 'dim') : i === selected ? 'picked' : '';
          return (
            <motion.button
              key={i}
              type="button"
              className={`option ${cls}`}
              disabled={locked}
              whileHover={locked ? {} : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={locked && i === selected && result === 'wrong' ? { x: [0, -9, 9, -6, 6, 0] } : locked && i === q.answerIdx ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.4 }}
              onClick={() => onSelect(i)}
            >
              <kbd>{i + 1}</kbd>
              <span className="opt-text">{tr(o.text)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function OrderQuestion({ q, picked, setPicked, locked, tr }) {
  const tiles = useMemo(() => q.words.map((w, i) => ({ id: i, w })), [q.qid]); // eslint-disable-line react-hooks/exhaustive-deps
  const free = tiles.filter((x) => !picked.includes(x.id));
  return (
    <div className="q-body">
      <div className="stem">
        <div className="stem-text">
          {tr(q.hint)}
          <Speaker text={q.speak} />
        </div>
      </div>
      <div className="answer-line">
        {picked.map((id) => (
          <motion.button
            key={id}
              initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="tile"
            disabled={locked}
            onClick={() => setPicked(picked.filter((x) => x !== id))}
          >
            {tiles[id].w}
          </motion.button>
        ))}
      </div>
      <div className="tile-bank">
        {free.map((x) => (
          <motion.button key={x.id} className="tile" whileTap={{ scale: 0.94 }} disabled={locked} onClick={() => setPicked([...picked, x.id])}>
            {x.w}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Hearts({ n }) {
  return (
    <div className="hearts" aria-label={`${n} hearts`}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <motion.span key={i} className={i < n ? 'on' : ''} animate={{ scale: i < n ? 1 : 0.85 }}>
          <Icon name="heart" size={18} fill />
        </motion.span>
      ))}
    </div>
  );
}

export default function Lesson({ lessonId }) {
  const { state, t, tr, go, completeLesson } = useApp();
  const lesson = getLesson(lessonId);
  const [run, setRun] = useState(0);
  const [queue, setQueue] = useState(() => buildQuestions(lesson));
  const total = useRef(queue.length);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [picked, setPicked] = useState([]);
  const [result, setResult] = useState(null); // null | 'right' | 'wrong'
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [correctFirst, setCorrectFirst] = useState(0);
  const [phase, setPhase] = useState('guide'); // guide | play | done | failed
  const [showGuide, setShowGuide] = useState(false);
  const [summary, setSummary] = useState(null);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [praise, setPraise] = useState('');

  const q = queue[idx];
  const sound = state.profile.sound;
  const canCheck = q && (q.kind === 'choice' ? selected !== null : picked.length > 0);

  const restart = () => {
    const fresh = buildQuestions(lesson);
    total.current = fresh.length;
    setQueue(fresh);
    setIdx(0);
    setSelected(null);
    setPicked([]);
    setResult(null);
    setHearts(MAX_HEARTS);
    setMistakes(0);
    setCorrectFirst(0);
    setPhase('play');
    setRun((r) => r + 1);
  };

  const check = () => {
    if (!q || result) return;
    let ok;
    if (q.kind === 'choice') {
      ok = selected === q.answerIdx;
      if (q.speakOnPick && state.profile.voice) speak(q.speakOnPick);
    } else {
      ok = picked.map((id) => q.words[id]).join(' ') === q.answer.join(' ');
    }
    setResult(ok ? 'right' : 'wrong');
    if (ok) {
      const lines = t('correct');
      setPraise(lines[Math.floor(Math.random() * lines.length)]);
      if (!q.retry) setCorrectFirst((n) => n + 1);
      if (sound) playSound('correct');
      if (q.kind === 'order' && state.profile.voice) speak(q.speak);
    } else {
      setMistakes((m) => m + 1);
      setHearts((h) => h - 1);
      if (sound) playSound('wrong');
    }
  };

  const finish = () => {
    const perfect = mistakes === 0;
    const stars = perfect ? 3 : mistakes <= 2 ? 2 : 1;
    const xpGain = correctFirst * 10 + 20 + (perfect ? 10 : 0);
    const info = completeLesson({ lessonId, xpGain, stars, perfect });
    const ranks = t('ranks');
    setSummary({ xpGain, stars, perfect, accuracy: Math.round((correctFirst / total.current) * 100), ...info, rank: ranks[Math.min(info.level - 1, ranks.length - 1)] });
    setPhase('done');
    if (sound) playSound('win');
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: CONFETTI_COLORS, scalar: 0.9 });
    if (info.leveledUp || info.newBadges.length) {
      setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.4 }, colors: CONFETTI_COLORS, scalar: 0.9 }), 500);
    }
  };

  const next = () => {
    const wasWrong = result === 'wrong';
    if (wasWrong && hearts <= 0) {
      setPhase('failed');
      return;
    }
    let list = queue;
    if (wasWrong) {
      const again = { ...q, retry: true, qid: `${q.qid}-r${mistakes}` };
      if (again.options) {
        again.options = shuffle(again.options);
        again.answerIdx = again.options.findIndex((o) => o.ok);
      }
      list = [...queue, again];
    }
    if (idx + 1 >= list.length) {
      finish();
      return;
    }
    setQueue(list);
    setIdx(idx + 1);
    setSelected(null);
    setPicked([]);
    setResult(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'play' || confirmQuit || showGuide) return;
      if (e.key === 'Enter') {
        if (result) next();
        else if (canCheck) check();
      } else if (!result && q && q.kind === 'choice' && /^[1-9]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < q.options.length) setSelected(i);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (phase === 'guide') {
    return (
      <div className="lesson-guide">
        <div className="lesson-top">
          <button className="x-btn" aria-label="Close" onClick={() => go('home')}><Icon name="x" size={22} /></button>
        </div>
        <Guide lesson={lesson} primaryLabel={t('guideStart')} onStart={() => setPhase('play')} />
      </div>
    );
  }

  if (phase === 'failed') {
    return (
      <div className="result">
        <div className="result-icon bad"><Icon name="heart" size={44} /></div>
        <h2>{t('outOfHearts')}</h2>
        <p className="muted">{t('outOfHeartsSub')}</p>
        <button className="btn primary big" onClick={restart}><Icon name="rotate" size={18} /> {t('tryLessonAgain')}</button>
        <button className="btn ghost" onClick={() => go('home')}>{t('backHome')}</button>
      </div>
    );
  }

  if (phase === 'done' && summary) {
    return (
      <div className="result">
        <motion.div className="result-icon good" initial={{ scale: 0 }} animate={{ scale: [0, 1.15, 1] }} transition={{ duration: 0.55 }}>
          <Icon name="trophy" size={48} />
        </motion.div>
        <h2>{t('lessonComplete')}</h2>
        <p className="muted">{tr(lesson.title)}</p>
        <div className="big-stars">
          {[1, 2, 3].map((i) => (
            <motion.span key={i} initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3 + i * 0.22, type: 'spring', stiffness: 260, damping: 12 }}>
              <Icon name="star" size={54} fill strokeWidth={1.4} className={i <= summary.stars ? 'on' : ''} />
            </motion.span>
          ))}
        </div>
        <div className="result-stats">
          <div className="stat-card"><small>{t('earned')}</small><b className="xp">+{summary.xpGain} {t('xp')}</b></div>
          <div className="stat-card"><small>{t('accuracy')}</small><b>{summary.accuracy}%</b></div>
        </div>
        <div className="banners">
          {summary.leveledUp && (
            <motion.div className="banner level" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <Icon name="rocket" size={20} /> <span><b>{t('rankUp')}</b> {summary.rank}</span>
            </motion.div>
          )}
          {summary.goalReached && (
            <motion.div className="banner goal" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Icon name="target" size={20} /> <span><b>{t('goalDone')}</b></span>
            </motion.div>
          )}
          {summary.newBadges.map((b, i) => (
            <motion.div key={b.id} className="banner badge" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.2 }}>
              <Icon name={b.icon} size={20} /> <span><b>{t('newBadge')}</b> {tr(b.name)}</span>
            </motion.div>
          ))}
        </div>
        <button className="btn primary big" onClick={() => go('home')}>{t('continue')}</button>
        <button className="btn ghost" onClick={restart}>{t('practice')}</button>
      </div>
    );
  }

  if (!q) return null;

  const progress = (idx / (total.current + mistakes)) * 100;
  const ans = q.kind === 'choice' ? q.options[q.answerIdx] : null;
  const correctText = q.kind === 'order' ? q.answer.join(' ') : tr(ans.text);

  return (
    <div className="lesson" key={run}>
      <div className="lesson-top">
        <button className="x-btn" aria-label="Close" onClick={() => setConfirmQuit(true)}><Icon name="x" size={22} /></button>
        <div className="bar thick"><motion.div className="bar-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} /></div>
        <button className="x-btn guide-btn" aria-label={t('guideLabel')} title={t('guideLabel')} onClick={() => setShowGuide(true)}><Icon name="book" size={20} /></button>
        <Hearts n={hearts} />
      </div>

      <div className="q-slot">
        <motion.div key={q.qid} className="q-wrap" initial={{ x: 36, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.24, ease: 'easeOut' }}>
          <p className="eyebrow">{t('questionOf')} {Math.min(idx + 1, total.current)}/{total.current}</p>
          <h2 className="q-title">{t(q.promptKey)}</h2>
          {q.kind === 'choice' ? (
            <ChoiceQuestion q={q} selected={selected} onSelect={(i) => { if (sound) playSound('tap'); setSelected(i); }} locked={!!result} result={result} tr={tr} t={t} />
          ) : (
            <OrderQuestion q={q} picked={picked} setPicked={setPicked} locked={!!result} tr={tr} />
          )}
        </motion.div>
      </div>

      <footer className={`lesson-foot ${result || ''}`}>
        <div className="foot-inner">
          <AnimatePresence mode="wait">
            <motion.div key={result || 'idle'} className={`fb ${result ? '' : 'idle'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {result === 'right' && (
                <>
                  <span className="fb-icon"><Icon name="check" size={22} strokeWidth={3} /></span>
                  <div>
                    <b>{praise}</b>
                    {q.note && <div className="fb-note">{q.note}</div>}
                  </div>
                </>
              )}
              {result === 'wrong' && (
                <>
                  <span className="fb-icon"><Icon name="x" size={22} strokeWidth={3} /></span>
                  <div>
                    <b>{t('wrong')}</b>
                    <div className="fb-answer">{correctText}</div>
                    {q.note && <div className="fb-note">{q.note}</div>}
                    <div className="small">{t('tryAgain')}</div>
                  </div>
                </>
              )}
              {!result && <span className="hint-text muted small">{t('shortcutHint')}</span>}
            </motion.div>
          </AnimatePresence>
          <button className={`btn big ${result === 'wrong' ? 'danger' : 'primary'}`} disabled={!result && !canCheck} onClick={result ? next : check}>
            {result ? t('continue') : t('check')}
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {showGuide && (
          <motion.div className="modal-back guide-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal wide" initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }}>
              <Guide lesson={lesson} primaryLabel={t('guideClose')} onStart={() => setShowGuide(false)} />
            </motion.div>
          </motion.div>
        )}
        {confirmQuit && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.92, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
              <h3>{t('quit')}</h3>
              <p className="muted">{t('quitSub')}</p>
              <button className="btn primary" onClick={() => setConfirmQuit(false)}>{t('keepGoing')}</button>
              <button className="btn ghost" onClick={() => go('home')}>{t('quitNow')}</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
