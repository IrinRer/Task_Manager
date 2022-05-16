import { UserRoles } from './types/common';

export const BASE_DATE_FORMAT = 'DD.MM.YYYY' as const;

export const AVATAR_COLORS = [
  '#64D9D1',
  '#C3AEFF',
  '#8CB369',
  '#FF9DE4',
  '#AED640',
  '#F2C14E',
  '#75A0E0',
  '#63D2FF',
  '#F78154',
  '#E2A3C7',
  '#FE6D73',
  '#5E95AB',
  '#AD5795',
  '#FF715B',
];
export const AVATAR_TEXT_COLOR = '#ffffff';

export const DEBOUNCE_TIMEOUT = 500;

// для проверки ролей моих задач
export const MY_TASKS_ROLES = [
  UserRoles.author,
  UserRoles.executor,
  UserRoles.watcher,
  UserRoles.responsible,
];
