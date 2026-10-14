import { LEVELS } from './index.js';

const levelDone = (state, id) => {
  const lv = LEVELS.find((l) => l.id === id);
  return lv.lessons.every((l) => state.lessons[l.id]?.stars > 0);
};

const lessonsDone = (state) => Object.values(state.lessons).filter((l) => l.stars > 0).length;
const totalStars = (state) => Object.values(state.lessons).reduce((s, l) => s + (l.stars || 0), 0);

export const BADGES = [
  { id: 'first', icon: '🌟', name: { en: 'First Step', id: 'Langkah Pertama' }, desc: { en: 'Finish your first lesson', id: 'Selesaikan pelajaran pertamamu' }, test: (s) => lessonsDone(s) >= 1 },
  { id: 'perfect', icon: '💎', name: { en: 'Perfect!', id: 'Sempurna!' }, desc: { en: 'Finish a lesson with no mistakes', id: 'Selesaikan pelajaran tanpa salah' }, test: (s, c) => c.perfect || s.perfectCount > 0 },
  { id: 'goal', icon: '🎯', name: { en: 'On Target', id: 'Tepat Sasaran' }, desc: { en: 'Reach your daily goal', id: 'Capai target harianmu' }, test: (s, c) => c.goalReached || s.goalsReached > 0 },
  { id: 'streak3', icon: '🔥', name: { en: 'On Fire', id: 'Membara' }, desc: { en: 'Learn 3 days in a row', id: 'Belajar 3 hari berturut-turut' }, test: (s) => s.streak >= 3 },
  { id: 'streak7', icon: '🏅', name: { en: 'Week Warrior', id: 'Pejuang Seminggu' }, desc: { en: 'Learn 7 days in a row', id: 'Belajar 7 hari berturut-turut' }, test: (s) => s.streak >= 7 },
  { id: 'xp100', icon: '⚡', name: { en: 'Power Up', id: 'Penuh Tenaga' }, desc: { en: 'Earn 100 XP', id: 'Kumpulkan 100 XP' }, test: (s) => s.xp >= 100 },
  { id: 'xp500', icon: '🚀', name: { en: 'Rocket', id: 'Roket' }, desc: { en: 'Earn 500 XP', id: 'Kumpulkan 500 XP' }, test: (s) => s.xp >= 500 },
  { id: 'five', icon: '📚', name: { en: 'Bookworm', id: 'Kutu Buku' }, desc: { en: 'Finish 5 lessons', id: 'Selesaikan 5 pelajaran' }, test: (s) => lessonsDone(s) >= 5 },
  { id: 'stars', icon: '✨', name: { en: 'Star Collector', id: 'Kolektor Bintang' }, desc: { en: 'Collect 20 stars', id: 'Kumpulkan 20 bintang' }, test: (s) => totalStars(s) >= 20 },
  { id: 'kidsMaster', icon: '🧸', name: { en: 'Kids Champion', id: 'Juara Anak-anak' }, desc: { en: 'Finish every Kids lesson', id: 'Selesaikan semua pelajaran Anak-anak' }, test: (s) => levelDone(s, 'kids') },
  { id: 'beginnerMaster', icon: '🌱', name: { en: 'Beginner Champion', id: 'Juara Pemula' }, desc: { en: 'Finish every Beginner lesson', id: 'Selesaikan semua pelajaran Pemula' }, test: (s) => levelDone(s, 'beginner') },
  { id: 'interMaster', icon: '👑', name: { en: 'Intermediate Champion', id: 'Juara Menengah' }, desc: { en: 'Finish every Intermediate lesson', id: 'Selesaikan semua pelajaran Menengah' }, test: (s) => levelDone(s, 'intermediate') },
];
