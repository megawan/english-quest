import { TRACKS } from './b2.js';
import { TRACKS as B1_TRACKS } from './b1.js';

const lessonsAllDone = (state, lessons) => lessons.every((l) => state.lessons[l.id]?.stars > 0);
const trackDone = (state, id) => lessonsAllDone(state, TRACKS.find((t) => t.id === id).lessons);
const lessonsDone = (state) => Object.values(state.lessons).filter((l) => l.stars > 0).length;
const totalStars = (state) => Object.values(state.lessons).reduce((s, l) => s + (l.stars || 0), 0);

export const BADGES = [
  { id: 'first', icon: 'star', name: 'First Step', desc: 'Finish your first lesson', test: (s) => lessonsDone(s) >= 1 },
  { id: 'perfect', icon: 'sparkle', name: 'Flawless', desc: 'Finish a lesson with no mistakes', test: (s, c) => c.perfect || s.perfectCount > 0 },
  { id: 'goal', icon: 'target', name: 'On Target', desc: 'Reach your daily goal', test: (s, c) => c.goalReached || s.goalsReached > 0 },
  { id: 'streak3', icon: 'flame', name: 'Momentum', desc: 'Learn 3 days in a row', test: (s) => s.streak >= 3 },
  { id: 'streak7', icon: 'medal', name: 'Week Warrior', desc: 'Learn 7 days in a row', test: (s) => s.streak >= 7 },
  { id: 'xp300', icon: 'bolt', name: 'Power User', desc: 'Earn 300 XP', test: (s) => s.xp >= 300 },
  { id: 'xp1000', icon: 'rocket', name: 'Rocket', desc: 'Earn 1,000 XP', test: (s) => s.xp >= 1000 },
  { id: 'stars', icon: 'trophy', name: 'Star Collector', desc: 'Collect 20 stars', test: (s) => totalStars(s) >= 20 },
  { id: 'pv', icon: 'link', name: 'Phrasal Pro', desc: 'Finish the Phrasal Verbs track', test: (s) => trackDone(s, 'pv') },
  { id: 'id', icon: 'quote', name: 'Idiom Insider', desc: 'Finish the Idioms track', test: (s) => trackDone(s, 'id') },
  { id: 'gr', icon: 'pen', name: 'Grammar Guru', desc: 'Finish the Grammar track', test: (s) => trackDone(s, 'gr') },
  { id: 'rd', icon: 'book', name: 'Close Reader', desc: 'Finish the Reading track', test: (s) => trackDone(s, 'rd') },
  { id: 'wc', icon: 'scale', name: 'Word Smith', desc: 'Finish the Word Choice track', test: (s) => trackDone(s, 'wc') },
  { id: 'crown-b1', icon: 'crown', name: 'B1 Champion', desc: 'Finish every B1 lesson', test: (s) => B1_TRACKS.every((t) => lessonsAllDone(s, t.lessons)) },
  { id: 'crown', icon: 'crown', name: 'B2 Champion', desc: 'Finish every B2 lesson', test: (s) => TRACKS.every((t) => trackDone(s, t.id)) },
];
