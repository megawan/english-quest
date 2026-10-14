import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App.jsx';
import { speak, hasSpeech } from '../speech.js';
import Icon from './Icon.jsx';

// Plain-English explanation shown before a lesson (and reopenable from inside it).
export default function Guide({ lesson, onStart, onClose, primaryLabel }) {
  const { t, tr, state } = useApp();
  const canSpeak = state.profile.voice && hasSpeech();
  const { guide } = lesson;

  return (
    <div className="guide">
      <p className="eyebrow">{t('guideLabel')}</p>
      <h1>{tr(lesson.title)}</h1>
      <p className="guide-intro">{guide.intro}</p>

      <h2 className="guide-sub">{t('keyPoints')}</h2>
      <ul className="guide-points">
        {guide.points.map((pt, i) => (
          <motion.li key={pt.term} className="guide-point" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <strong>{pt.term}</strong>
            <p>{pt.text}</p>
            <div className="guide-example">
              <span className="ex-label">{t('example')}</span>
              <span className="ex-text">{pt.example}</span>
              {canSpeak && (
                <button type="button" className="ex-listen" aria-label={t('listen')} onClick={() => speak(pt.example)}>
                  <Icon name="volume" size={16} />
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="guide-actions">
        <button className="btn primary big" onClick={onStart}>
          {primaryLabel} <Icon name="arrow" size={18} />
        </button>
        {onClose && <button className="btn ghost" onClick={onClose}>{t('guideClose')}</button>}
      </div>
    </div>
  );
}
