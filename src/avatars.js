export const AVATAR_COLORS = [
  ['#6366f1', '#8b5cf6'],
  ['#0ea5e9', '#6366f1'],
  ['#10b981', '#0ea5e9'],
  ['#f59e0b', '#ef4444'],
  ['#ec4899', '#8b5cf6'],
  ['#14b8a6', '#22c55e'],
  ['#f97316', '#f43f5e'],
  ['#64748b', '#1e293b'],
];

export function avatarGradient(key) {
  const [a, b] = AVATAR_COLORS[Number(key)] || AVATAR_COLORS[0];
  return `linear-gradient(135deg, ${a}, ${b})`;
}
