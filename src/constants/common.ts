import { createContext } from 'react';
import { TRights } from './rights';
import { ROLES } from './types/common';

export const BASE_DATE_FORMAT = 'DD.MM.YYYY' as const;

export const DATE_FORMAT_UI = 'dd MMM yyyy' as const;
export const DATE_FORMAT_SERVER = 'yyyy-MM-dd' as const;

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
] as const;
export const AVATAR_TEXT_COLOR = '#ffffff' as const;

export const DEBOUNCE_TIMEOUT = 500 as const;

// для проверки ролей моих задач
export const MY_TASKS_ROLES = [
  ROLES.author,
  ROLES.implementer,
  ROLES.watcher,
  ROLES.responsible,
];
// TODO: Длина обрезки заголовка будет зависеть от разрешения экрана
// переделается в дальшейшем
export const TITLE_LENGTH = 100 as const;

export const PARTICIPANTS_INPUT_MAX_LENGTH = 50 as const;

export const TAGS_INPUT_MAX_LENGTH = 15 as const;

export const PRIORITY_COLORS = {
  Высокий: 'Red',
  Средний: 'Orange',
  Низкий: 'Green',
} as const;
// Стили приоритета
export const STYLES = ['high', 'middle', 'low'] as const;

export enum StatusClass {
  'Создана' = 'created',
  'В работе' = 'work',
  'Выполнена' = 'done',
  'Не выполнена' = 'paused',
}

// export const PRIORITY_STYLES: string[] = ['high', 'middle', 'low'];

export enum BlockTitle {
  in = 'Входящие',
  work = 'В работе',
  done = 'Завершено',
}
export const USERS_BY_ONE_MAX_COUNT = 3 as const;

export const DEFAULT_CHECK_LIST_TITLE = 'Чек-лист' as const;

export const DESCRIPTION_LENGTH_EXPAND = 300 as const;

export const DESCRIPTION_MAX_LENGTH = 500 as const;

export const TITLE_TASK_MAX_LENGTH = 150 as const;

export const RoleContext = createContext<TRights | ''>('');
export const EditableContext = createContext<boolean>(false);

export const RELOAD_TASKS_INTERVAL = 420000 as const; // Перезагружаем задачи каждые 7 минут

export const DATE_TIME_FORMAT = 'dd MMM yyyy h:mm' as const;
export const DATE_FORMAT = 'dd MMM yyyy' as const;
export const MAX_USER_INITIALS = 2 as const;
export const MAX_TAGS_TO_SHOW = 3 as const;

export const ERROR_MESSAGE_SET_MEMBERS = 'Ошибка назначения участника';

export const MIN_DESKTOP_WIDTH = 768;
export const MIN_DESKTOP_WIDTH_HOMEPAGE = 1350;
export const DESKTOP_WIDTH_HOMEPAGE_MOVE_TAGS = 1160;
export const DESKTOP_WIDTH_HOMEPAGE_MOVE_ROLES = 1024;

export const TIME_SHOW_NOTICE_IN_SECONDS = 5 as const;

export const HISTORY_ADAPTIVE = 999 as const;
