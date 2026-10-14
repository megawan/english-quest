import { TRACKS } from './b2.js';

// Every key point from every lesson guide, as one flat, searchable list.
export const wordKey = (term) => term.trim().toLowerCase();

const seen = new Set();
export const WORDS = TRACKS.flatMap((track) =>
  track.lessons.flatMap((lesson) =>
    lesson.guide.points.map((pt) => ({ ...pt, key: wordKey(pt.term), trackId: track.id, lessonId: lesson.id, lessonTitle: lesson.title })),
  ),
).filter((w) => !seen.has(w.key) && seen.add(w.key));
