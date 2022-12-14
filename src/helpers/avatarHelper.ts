import { AVATAR_COLORS, MAX_USER_INITIALS } from 'constants/common';

export const getInitialsFromName = (name: string): string => {
  return name
    .trim()
    .split(' ')
    .slice(0, MAX_USER_INITIALS)
    .map((name) => name[0])
    .join('')
    .toUpperCase();
};

export const getAvatarColor = (): string => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};
