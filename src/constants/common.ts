import { createContext } from 'react';
import { ROLES } from './types/common';
import { TRights } from './rights';

export const BASE_DATE_FORMAT = 'DD.MM.YYYY' as const;

export const DATE_FORMAT_UI = 'dd MMM yyyy';
export const DATE_FORMAT_SERVER = 'yyyy-MM-dd';

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
  ROLES.author,
  ROLES.implementer,
  ROLES.watcher,
  ROLES.responsible,
];
// TODO: Длина обрезки заголовка будет зависеть от разрешения экрана
// переделается в дальшейшем
export const TITLE_LENGTH = 100;

export const PARTICIPANTS_INPUT_MAX_LENGTH = 50;

export const TAGS_INPUT_MAX_LENGTH = 15;

export const PRIORITY_COLORS = {
  Высокий: 'Red',
  Средний: 'Orange',
  Низкий: 'Green',
};

export const STYLES = ['high', 'middle', 'low'];

export enum StatusClass {
  'Создана' = 'created',
  'В работе' = 'work',
  'Выполнена' = 'done',
  'Не выполнена' = 'paused',
}

export const PRIORITY_STYLES: string[] = ['high', 'middle', 'low'];

export enum BlockTitle {
  in = 'Входящие',
  work = 'В работе',
  done = 'Завершено',
}
export const USERS_BY_ONE_MAX_COUNT = 3;

export const DEFAULT_CHECK_LIST_TITLE = 'Чек-лист';

export const DESCRIPTION_LENGTH_EXPAND = 300;

export const DESCRIPTION_MAX_LENGTH = 500;

export const TITLE_TASK_MAX_LENGTH = 150;

export const RoleContext = createContext<TRights | ''>('');
export const EditableContext = createContext<boolean>(false);

