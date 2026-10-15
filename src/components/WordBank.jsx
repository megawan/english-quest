import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../App.jsx';
import { levelOf } from '../data/levels.js';
import { WORDS } from '../data/words.js';
import { speak, hasSpeech } from '../speech.js';
import Icon from './Icon.jsx';

export default function WordBank() {
  const { t, state, toggleSaved, openLesson } = useApp();
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const level = levelOf(state.profile.level);
  const TRACKS = level.tracks;
  useEffect(() => setType('all'), [level.id]);
  const canSpeak = state.profile.voice && hasSpeech();
  const trackName = (id) => TRACKS.find((tr) => tr.id === id)?.title;

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return WORDS.filter(
      (w) =>
        w.level === level.id &&
        (type === 'all' || w.trackId === type) &&
        (!savedOnly || state.saved[w.key]) &&
        (!needle || `${w.term} ${w.text} ${w.example}`.toLowerCase().includes(needle)),
    );
  }, [q, type, savedOnly, state.saved, level.id]);

  const savedCount = WORDS.filter((w) => w.level === level.id && state.saved[w.key]).length;

  return (
    <div className="wordbank">
      <header className="page-head">
        <div>
          <h1>{t('wordBank')} · {level.code}</h1>
          <p className="muted">{t('wordBankSub')}</p>
        </div>
      </header>

      <div className="wb-search">
        <Icon name="search" size={18} />
        <input className="text-input" type="search" value={q} placeholder={t('searchWords')} aria-label={t('searchWords')} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="wb-filters" role="group">
        <button className={`chip ${!savedOnly && type === 'all' ? 'on' : ''}`} onClick={() => { setType('all'); setSavedOnly(false); }}>{t('allTypes')}</button>
        <button className={`chip ${savedOnly ? 'on' : ''}`} onClick={() => setSavedOnly((v) => !v)}>
          <Icon name="bookmark" size={14} fill={savedOnly} /> {t('savedOnly')} ({savedCount})
        </button>
        {TRACKS.map((tr) => (
          <button key={tr.id} className={`chip ${type === tr.id ? 'on' : ''}`} onClick={() => setType(type === tr.id ? 'all' : tr.id)}>{tr.title}</button>
        ))}
      </div>

      <p className="muted tiny">{list.length} {t('words')}</p>

      {list.length === 0 ? (
        <p className="muted center">{savedOnly && !q ? t('noSaved') : t('noWords')}</p>
      ) : (
        <ul className="guide-points">
          {list.map((w) => {
            const on = !!state.saved[w.key];
            return (
              <li key={w.key} className="guide-point">
                <div className="point-head">
                  <strong>{w.term}</strong>
                  <button type="button" className={`bm-btn ${on ? 'on' : ''}`} aria-pressed={on} aria-label={on ? t('unsave') : t('save')} onClick={() => toggleSaved(w.key)}>
                    <Icon name="bookmark" size={18} fill={on} />
                  </button>
                </div>
                <p>{w.text}</p>
                <div className="guide-example">
                  <span className="ex-label">{t('example')}</span>
                  <span className="ex-text">{w.example}</span>
                  {canSpeak && (
                    <button type="button" className="ex-listen" aria-label={t('listen')} onClick={() => speak(w.example)}>
                      <Icon name="volume" size={16} />
                    </button>
                  )}
                </div>
                <p className="wb-meta tiny muted">{trackName(w.trackId)} · {t('fromLesson')} {w.lessonTitle}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
