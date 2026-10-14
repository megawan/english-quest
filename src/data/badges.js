import { TRACKS } from './b2.js';

const trackDone = (state, id) => TRACKS.find((t) => t.id === id).lessons.every((l) => state.lessons[l.id]?.stars > 0);
const lessonsDone = (state) => Object.values(state.lessons).filter((l) => l.stars > 0).length;
const totalStars = (state) => Object.values(state.lessons).reduce((s, l) => s + (l.stars || 0), 0);

export const BADGES = [
  { id: 'first', icon: 'star', name: { en: 'First Step', id: 'Langkah Pertama' }, desc: { en: 'Finish your first lesson', id: 'Selesaikan pelajaran pertamamu' }, test: (s) => lessonsDone(s) >= 1 },
  { id: 'perfect', icon: 'sparkle', name: { en: 'Flawless', id: 'Tanpa Cela' }, desc: { en: 'Finish a lesson with no mistakes', id: 'Selesaikan pelajaran tanpa salah' }, test: (s, c) => c.perfect || s.perfectCount > 0 },
  { id: 'goal', icon: 'target', name: { en: 'On Target', id: 'Tepat Sasaran' }, desc: { en: 'Reach your daily goal', id: 'Capai target harianmu' }, test: (s, c) => c.goalReached || s.goalsReached > 0 },
  { id: 'streak3', icon: 'flame', name: { en: 'Momentum', id: 'Momentum' }, desc: { en: 'Learn 3 days in a row', id: 'Belajar 3 hari berturut-turut' }, test: (s) => s.streak >= 3 },
  { id: 'streak7', icon: 'medal', name: { en: 'Week Warrior', id: 'Pejuang Seminggu' }, desc: { en: 'Learn 7 days in a row', id: 'Belajar 7 hari berturut-turut' }, test: (s) => s.streak >= 7 },
  { id: 'xp300', icon: 'bolt', name: { en: 'Power User', id: 'Penuh Tenaga' }, desc: { en: 'Earn 300 XP', id: 'Kumpulkan 300 XP' }, test: (s) => s.xp >= 300 },
  { id: 'xp1000', icon: 'rocket', name: { en: 'Rocket', id: 'Roket' }, desc: { en: 'Earn 1,000 XP', id: 'Kumpulkan 1.000 XP' }, test: (s) => s.xp >= 1000 },
  { id: 'stars', icon: 'trophy', name: { en: 'Star Collector', id: 'Kolektor Bintang' }, desc: { en: 'Collect 20 stars', id: 'Kumpulkan 20 bintang' }, test: (s) => totalStars(s) >= 20 },
  { id: 'pv', icon: 'link', name: { en: 'Phrasal Pro', id: 'Ahli Phrasal Verb' }, desc: { en: 'Finish the Phrasal Verbs track', id: 'Selesaikan jalur Phrasal Verbs' }, test: (s) => trackDone(s, 'pv') },
  { id: 'id', icon: 'quote', name: { en: 'Idiom Insider', id: 'Ahli Idiom' }, desc: { en: 'Finish the Idioms track', id: 'Selesaikan jalur Idiom' }, test: (s) => trackDone(s, 'id') },
  { id: 'gr', icon: 'pen', name: { en: 'Grammar Guru', id: 'Pakar Grammar' }, desc: { en: 'Finish the Grammar track', id: 'Selesaikan jalur Grammar' }, test: (s) => trackDone(s, 'gr') },
  { id: 'rd', icon: 'book', name: { en: 'Close Reader', id: 'Pembaca Cermat' }, desc: { en: 'Finish the Reading track', id: 'Selesaikan jalur Membaca' }, test: (s) => trackDone(s, 'rd') },
  { id: 'wc', icon: 'scale', name: { en: 'Word Smith', id: 'Perajin Kata' }, desc: { en: 'Finish the Word Choice track', id: 'Selesaikan jalur Pilihan Kata' }, test: (s) => trackDone(s, 'wc') },
  { id: 'crown', icon: 'crown', name: { en: 'B2 Champion', id: 'Juara B2' }, desc: { en: 'Finish every lesson', id: 'Selesaikan semua pelajaran' }, test: (s) => TRACKS.every((t) => trackDone(s, t.id)) },
];
