import React from 'react';
import { avatarGradient } from '../avatars.js';
import Icon from './Icon.jsx';

export default function Avatar({ color, name, size = 44 }) {
  const initial = (name || '').trim().charAt(0).toUpperCase();
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: avatarGradient(color), fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {initial || <Icon name="user" size={size * 0.5} strokeWidth={2.2} />}
    </span>
  );
}
