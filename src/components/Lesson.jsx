import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../App.jsx';
import { getLesson } from '../data/index.js';
import { buildQuestions } from '../data/build.js';
import { speak, hasSpeech } from '../speech.js';
import { playSound } from '../sound.js';
import { shuffle } from '../util.js';

const MAX_HEARTS = 5;

function Speaker({ text, slow, big }) {
  const { state } = useApp();
  if (!state.profile.voice || !hasSpeech() || !text) return null;
  return (
    <motion.button
      type="button"
      className={`speaker ${big ? 'big' : ''}`}
      whileTap={{ scale: 0.85 }}
      onClick={() => speak(text, { slow })}
      aria-label="Listen"
    >
      🔊
    </motion.button>
  );
}

function ChoiceQuestion({ q, selected, onSelect, locked, result, kids, lang }) {
  const { state } = useApp();
  const voice = state.profile.voice;
  const emojiOptions = q.options.some((o) => o.emoji);

  useEffect(() => {
    if (q.stem.autoSpeak && voice) {
      const id = setTimeout(() => speak(q.stem.listen, { slow: kids }), 350);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [q.qid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="q-body">
      <div className="stem">
        {q.stem.emoji && (
          <motion.div className="stem-emoji" initial={{ scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 12 }}>
            {q.stem.emoji}
          </motion.div>
        )}
        {q.stem.listen && <Speaker text={q.stem.listen} slow={kids} big />}
        {q.stem.listen && (!voice || !hasSpeech()) && <div className="stem-text">{q.stem.listen}</div>}
        {q.stem.text && (
          <div className="stem-text">
            {q.stem.text}
            <Speaker text={q.stem.speak} />
          </div>
        )}
        {q.stem.sub && (q.stem.sub[lang] || typeof q.stem.sub === 'string') && (
          <div className="stem-sub">{typeof q.stem.sub === 'string' ? q.stem.sub : q.stem.sub[lang]}</div>
        )}
        {q.stem.emoji && q.stem.speak && <Speaker text={q.stem.speak} slow={kids} />}
      </div>

      <div className={`options ${emojiOptions ? 'grid' : ''}`}>
        {q.options.map((o, i) => {
          const cls = locked
            ? i === q.answerIdx
              ? 'right'
              : i === selected
                ? 'wrong'
                : 'dim'
            : i === selected
              ? 'picked'
              : '';
          return (
            <motion.button
              key={i}
              type="button"
              className={`option ${cls}`}
              disabled={locked}
              whileTap={{ scale: 0.95 }}
              animate={locked && i === selected && result === 'wrong' ? { x: [0, -10, 10, -8, 8, 0] } : locked && i === q.answerIdx ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.4 }}
              onClick={() => onSelect(i)}
            >
              {o.emoji && <span className="opt-emoji">{o.emoji}</span>}
              {o.text && <span>{o.text}</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function OrderQuestion({ q, picked, setPicked, locked, lang, tr }) {
  const tiles = useMemo(() => q.words.map((w, i) => ({ id: i, w })), [q.qid]); // eslint-disable-line react-hooks/exhaustive-deps
  const free = tiles.filter((t) => !picked.includes(t.id));
  return (
    <div className="q-body">
      <div className="stem">
        <div className="stem-sub strong">{tr(q.hint)}</div>
        <Speaker text={q.speak} />
      </div>
      <div className="answer-line">
        <AnimatePresence>
          {picked.map((id) => (
            <motion.button
              key={id}
              layout
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="tile"
              disabled={locked}
              onClick={() => setPicked(picked.filter((x) => x !== id))}
            >
              {tiles[id].w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="tile-bank">
        {free.map((t) => (
          <motion.button
            key={t.id}
            layout
            className="tile"
            whileTap={{ scale: 0.9 }}
            disabled={locked}
            onClick={() => setPicked([...picked, t.id])}
          >
            {t.w}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Hearts({ n }) {
  return (
    <div className="hearts" aria-label={`${n} hearts`}>
      <AnimatePresence initial={false}>
        {Array.from({ length: MAX_HEARTS }).map((_, i) => (
          <motion.span key={i} animate={{ scale: i < n ? 1 : 0.8, opacity: i < n ? 1 : 0.25 }}>
            ❤️
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Lesson({ lessonId }) {
  const { state, t, tr, lang, go, kids, completeLesson } = useApp();
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
  const [phase, setPhase] = useState('play'); // play | done | failed
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
      if (q.speakOnPick && state.profile.voice) speak(q.speakOnPick, { slow: kids });
    } else {
      const built = picked.map((id) => q.words[id]);
      ok = built.join(' ') === q.answer.join(' ');
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
      if (!kids) setHearts((h) => h - 1);
      if (sound) playSound('wrong');
    }
  };

  const next = () => {
    const wasWrong = result === 'wrong';
    const heartsAfter = hearts;
    if (wasWrong && !kids && heartsAfter <= 0) {
      setPhase('failed');
      return;
    }
    let list = queue;
    if (wasWrong) list = [...queue, { ...q, retry: true, qid: `${q.qid}-r${mistakes}`, options: q.options && shuffle(q.options) }];
    // keep answerIdx correct after reshuffling options
    const last = list[list.length - 1];
    if (wasWrong && last.options) last.answerIdx = last.options.findIndex((o) => o.ok);
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

  const finish = () => {
    const perfect = mistakes === 0;
    const stars = perfect ? 3 : mistakes <= 2 ? 2 : 1;
    const xpGain = correctFirst * 10 + 20 + (perfect ? 10 : 0);
    const info = completeLesson({ lessonId, xpGain, stars, perfect });
    setSummary({ xpGain, stars, perfect, accuracy: Math.round((correctFirst / total.current) * 100), ...info });
    setPhase('done');
    if (sound) playSound('win');
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    if (info.leveledUp || info.newBadges.length) setTimeout(() => confetti({ particleCount: 90, spread: 110, origin: { y: 0.4 } }), 500);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'play') return;
      if (e.key === 'Enter') {
        if (result) next();
        else if (canCheck) check();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (phase === 'failed') {
    return (
      <div className="result">
        <motion.div className="result-emoji" animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>💔</motion.div>
        <h2>{t('outOfHearts')}</h2>
        <p className="muted">{t('outOfHeartsSub')}</p>
        <button className="btn primary big" onClick={restart}>{t('tryLessonAgain')}</button>
        <button className="btn ghost" onClick={() => go('home')}>{t('backHome')}</button>
      </div>
    );
  }

  if (phase === 'done' && summary) {
    return (
      <div className="result">
        <motion.div className="result-emoji" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.6 }}>🏆</motion.div>
        <h2>{t('lessonComplete')}</h2>
        <div className="big-stars">
          {[1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className={i <= summary.stars ? 'on' : ''}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 250, damping: 10 }}
            >
              ★
            </motion.span>
          ))}
        </div>
        <div className="result-stats">
          <div className="stat-card xp"><small>{t('earned')}</small><b>+{summary.xpGain} {t('xp')}</b></div>
          <div className="stat-card acc"><small>{t('accuracy')}</small><b>{summary.accuracy}%</b></div>
        </div>
        {summary.leveledUp && (
          <motion.div className="banner level" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            ⬆️ {t('levelUp')} {t('level')} {summary.level}
          </motion.div>
        )}
        {summary.goalReached && <motion.div className="banner goal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>🎯 {t('goalDone')}</motion.div>}
        {summary.newBadges.map((b, i) => (
          <motion.div key={b.id} className="banner badge" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 + i * 0.2 }}>
            <span className="badge-emoji">{b.icon}</span>
            <span><b>{t('newBadge')}</b> {tr(b.name)}</span>
          </motion.div>
        ))}
        <button className="btn primary big" onClick={() => go('home')}>{t('continue')}</button>
        <button className="btn ghost" onClick={restart}>{t('practice')}</button>
      </div>
    );
  }

  if (!q) return null;

  const progress = (idx / (total.current + mistakes)) * 100;
  const correctText =
    q.kind === 'order'
      ? q.answer.join(' ')
      : q.options[q.answerIdx].text || q.options[q.answerIdx].emoji;

  return (
    <div className="lesson" key={run}>
      <div className="lesson-top">
        <button className="x-btn" aria-label="Close" onClick={() => setConfirmQuit(true)}>✕</button>
        <div className="bar thick"><motion.div className="bar-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} /></div>
        {!kids && <Hearts n={hearts} />}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.qid}
          className="q-wrap"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <h2 className="q-title">{t(q.promptKey)}</h2>
          {q.kind === 'choice' ? (
            <ChoiceQuestion q={q} selected={selected} onSelect={(i) => { if (sound) playSound('tap'); setSelected(i); }} locked={!!result} result={result} kids={kids} lang={lang} />
          ) : (
            <OrderQuestion q={q} picked={picked} setPicked={setPicked} locked={!!result} lang={lang} tr={tr} />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.footer
          key={result || 'idle'}
          className={`lesson-foot ${result || ''}`}
          initial={{ y: result ? 80 : 0, opacity: result ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {result === 'right' && <div className="fb"><b>✅ {praise}</b></div>}
          {result === 'wrong' && (
            <div className="fb">
              <b>❌ {t('wrong')}</b>
              <div className="fb-answer">{correctText}</div>
              <div className="muted small">{t('tryAgain')}</div>
            </div>
          )}
          <button
            className={`btn big ${result === 'wrong' ? 'danger' : 'primary'}`}
            disabled={!result && !canCheck}
            onClick={result ? next : check}
          >
            {result ? t('continue') : t('check')}
          </button>
        </motion.footer>
      </AnimatePresence>

      <AnimatePresence>
        {confirmQuit && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
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
