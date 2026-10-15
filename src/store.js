import { useCallback, useEffect, useState } from 'react';
import { BADGES } from './data/badges.js';
import { todayStr, yesterdayStr } from './util.js';

const KEY = 'english-quest-b2-v1';
export const DAILY_GOAL = 30;
export const XP_PER_LEVEL = 150;

const initial = () => ({
  profile: { name: '', avatar: '0', lang: 'id', level: 'b2', sound: true, voice: true, onboarded: false },
  xp: 0,
  streak: 0,
  lastDay: null,
  daily: { date: todayStr(), xp: 0 },
  lessons: {},
  badges: {},
  saved: {},
  perfectCount: 0,
  goalsReached: 0,
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial();
    const saved = JSON.parse(raw);
    const base = initial();
    return { ...base, ...saved, profile: { ...base.profile, ...saved.profile } };
  } catch {
    return initial();
  }
}

// The streak only counts if the learner studied today or yesterday.
export function effectiveStreak(state) {
  if (!state.lastDay) return 0;
  return state.lastDay === todayStr() || state.lastDay === yesterdayStr() ? state.streak : 0;
}

export function dailyXp(state) {
  return state.daily.date === todayStr() ? state.daily.xp : 0;
}

export function playerLevel(xp) {
  return { level: Math.floor(xp / XP_PER_LEVEL) + 1, into: xp % XP_PER_LEVEL };
}

export function useGame() {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state]);

  const updateProfile = useCallback((patch) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const toggleSaved = useCallback((key) => {
    setState((s) => {
      const saved = { ...s.saved };
      if (saved[key]) delete saved[key];
      else saved[key] = todayStr();
      return { ...s, saved };
    });
  }, []);

  const reset = useCallback(() => {
    const fresh = initial();
    setState({ ...fresh, profile: { ...state.profile }, saved: state.saved });
  }, [state.profile]);

  // Applies the result of a finished lesson and reports what was unlocked.
  const completeLesson = useCallback(
    ({ lessonId, xpGain, stars, perfect }) => {
      const today = todayStr();
      const prevLevel = playerLevel(state.xp).level;
      const prevDaily = dailyXp(state);

      let streak = state.streak;
      if (state.lastDay !== today) streak = state.lastDay === yesterdayStr() ? state.streak + 1 : 1;

      const xp = state.xp + xpGain;
      const dailyNow = prevDaily + xpGain;
      const goalReached = prevDaily < DAILY_GOAL && dailyNow >= DAILY_GOAL;
      const prev = state.lessons[lessonId] || { stars: 0, plays: 0 };

      const next = {
        ...state,
        xp,
        streak,
        lastDay: today,
        daily: { date: today, xp: dailyNow },
        lessons: {
          ...state.lessons,
          [lessonId]: { stars: Math.max(prev.stars, stars), plays: prev.plays + 1 },
        },
        perfectCount: state.perfectCount + (perfect ? 1 : 0),
        goalsReached: state.goalsReached + (goalReached ? 1 : 0),
      };

      const newBadges = BADGES.filter((b) => !state.badges[b.id] && b.test(next, { perfect, goalReached }));
      if (newBadges.length) {
        next.badges = { ...next.badges };
        newBadges.forEach((b) => {
          next.badges[b.id] = today;
        });
      }

      setState(next);
      return {
        newBadges,
        goalReached,
        leveledUp: playerLevel(xp).level > prevLevel,
        level: playerLevel(xp).level,
      };
    },
    [state],
  );

  return { state, updateProfile, completeLesson, toggleSaved, reset };
}

// Player level (1, 2, 3 ...) maps to a rank title index.
export function rankIndex(level, count = 7) {
  return Math.min(level - 1, count - 1);
}
