import { AVATAR_COLORS } from 'constants/common';

export const getInitialsFromName = (name: string): string => {
  return name
    .trim()
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();
};

export const getAvatarColor = (): string => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};
