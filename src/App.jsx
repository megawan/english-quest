import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { makeT, pick } from './i18n.js';
import { useGame } from './store.js';
import Home from './components/Home.jsx';
import Lesson from './components/Lesson.jsx';
import Profile from './components/Profile.jsx';
import WordBank from './components/WordBank.jsx';
import NavBar from './components/NavBar.jsx';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export default function App() {
  const game = useGame();
  const { state } = game;
  const { lang } = state.profile;
  const [screen, setScreen] = useState('home');
  const [lessonId, setLessonId] = useState(null);

  const value = useMemo(
    () => ({
      ...game,
      lang,
      t: makeT(lang),
      tr: (obj) => pick(obj, lang),
      go: setScreen,
      openLesson: (id) => {
        setLessonId(id);
        setScreen('lesson');
      },
    }),
    [game, lang],
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, lessonId]);

  let view;
  if (screen === 'lesson' && lessonId) view = <Lesson key={`lesson-${lessonId}`} lessonId={lessonId} />;
  else if (screen === 'words') view = <WordBank key="words" />;
  else if (screen === 'profile') view = <Profile key="profile" />;
  else view = <Home key="home" />;

  const chrome = screen !== 'lesson';

  return (
    <Ctx.Provider value={value}>
      <div className={`app ${chrome ? 'with-nav' : ''}`}>
        {chrome && <NavBar screen={screen} />}
        <AnimatePresence mode="wait">
          <motion.main
            key={view.key}
            className="screen"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {view}
          </motion.main>
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
