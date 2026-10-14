import React from 'react';
import Icon from './Icon.jsx';

export default function Logo({ size = 36, withText = false, text = 'English Quest' }) {
  return (
    <span className="logo">
      <span className="logo-mark" style={{ width: size, height: size }}>
        <Icon name="logo" size={size * 0.58} strokeWidth={2.6} />
      </span>
      {withText && <span className="logo-text">{text}</span>}
    </span>
  );
}
