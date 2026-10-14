import React from 'react';
import Icon from './Icon.jsx';

export default function Stars({ n, size = 16 }) {
  return (
    <span className="stars" aria-label={`${n}/3`}>
      {[1, 2, 3].map((i) => (
        <Icon key={i} name="star" size={size} fill className={i <= n ? 'on' : ''} strokeWidth={1.5} />
      ))}
    </span>
  );
}
