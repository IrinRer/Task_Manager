import { AVATAR_COLORS } from 'constants/common';

export const initials = (name: string): string => {
  // Разбиваем строку Имени Фамилии
  const names = name.split(' ');

  // Берём первую букву первого слова и если есть второе, то первую букву его.
  return `${names[0][0].toUpperCase()}${
    names[1] ? names[1][0].toUpperCase() : null
  }`;
};

export const avatarColor = (): string => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};
