import { kidsLessons } from './kids.js';
import { beginnerLessons } from './beginner.js';
import { intermediateLessons } from './intermediate.js';

export const LEVELS = [
  { id: 'kids', icon: '🧸', nameKey: 'kids', subKey: 'kidsSub', lessons: kidsLessons },
  { id: 'beginner', icon: '🌱', nameKey: 'beginner', subKey: 'beginnerSub', lessons: beginnerLessons },
  { id: 'intermediate', icon: '🚀', nameKey: 'intermediate', subKey: 'intermediateSub', lessons: intermediateLessons },
];

export const ALL_LESSONS = LEVELS.flatMap((l) => l.lessons);

export function getLesson(id) {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLevel(id) {
  return LEVELS.find((l) => l.id === id);
}
