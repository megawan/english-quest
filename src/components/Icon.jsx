import React from 'react';

// Minimal line-icon set (24x24, stroke based).
const PATHS = {
  flame: 'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.2 1.2.8 2 1.6 2.2C10.2 8.5 10.8 5.5 12 3z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  lock: 'M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z M8 11V8a4 4 0 0 1 8 0v3',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6L6 18',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4z M8 6H5a2 2 0 0 0 0 4 3 3 0 0 0 3 2 M16 6h3a2 2 0 0 1 0 4 3 3 0 0 1-3 2 M12 13v4 M8.5 20h7 M10 17h4',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  book: 'M5 4h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2V4z M5 17a2 2 0 0 1 2-2h12',
  rocket: 'M5 19c0-3 1-5 3-6l3 3c-1 2-3 3-6 3z M9 13c0-5 4-9 10-9 0 6-4 10-9 10 M15 9h.01',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z',
  crown: 'M4 8l4 4 4-6 4 6 4-4-2 11H6L4 8z',
  sprout: 'M12 21v-9 M12 12c0-4-3-6-7-6 0 4 2 6 7 6 M12 14c0-3 2-5 6-5 0 3-2 5-6 5',
  smile: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2 M9 9.5h.01 M15 9.5h.01',
  medal: 'M12 10a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M9 3l3 5 3-5 M10.5 15l1 1 2-2',
  home: 'M4 11l8-7 8 7 M6 10v10h12V10 M10 20v-6h4v6',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4 21c0-4 3.5-7 8-7s8 3 8 7',
  volume: 'M4 9v6h4l5 4V5L8 9H4z M16.5 8.5a5 5 0 0 1 0 7 M19 6a8.5 8.5 0 0 1 0 12',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  rotate: 'M4 12a8 8 0 1 0 3-6.2 M4 4v5h5',
  play: 'M8 5v14l11-7L8 5z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
  chart: 'M5 20V10 M12 20V4 M19 20v-7',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  quote: 'M6 8h4v4a4 4 0 0 1-4 4 M14 8h4v4a4 4 0 0 1-4 4',
  pen: 'M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4z M14 7l3 3',
  scale: 'M12 4v16 M7 20h10 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0L5 7z M19 7l-3 7a3 3 0 0 0 6 0l-3-7z',
  bookmark: 'M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4',
  logo: 'M7 5h10 M7 12h8 M7 19h10 M7 5v14',
};

export default function Icon({ name, size = 20, fill = false, strokeWidth = 2, className = '', style }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={PATHS[name] || PATHS.star} />
    </svg>
  );
}
