import { TRACKS as B1 } from './b1.js';
import { TRACKS as B2 } from './b2.js';

export const LEVELS = {
  b1: { id: 'b1', code: 'B1', name: 'Lower-Intermediate', tracks: B1 },
  b2: { id: 'b2', code: 'B2', name: 'Upper-Intermediate', tracks: B2 },
};
export const LEVEL_IDS = Object.keys(LEVELS);
export const levelOf = (id) => LEVELS[id] || LEVELS.b2;

export const lessonsOf = (levelId) => levelOf(levelId).tracks.flatMap((t) => t.lessons);
export const ALL_LESSONS = LEVEL_IDS.flatMap((id) => lessonsOf(id));
export const getLesson = (id) => ALL_LESSONS.find((l) => l.id === id);
