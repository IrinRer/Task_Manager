import { ROLES } from './types/common';

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

export const MAX_USER_INITIALS = 2;

// export const DATE_FORMAT_HISTORY = 'dd MMM yyyy, HH:mm';

// export const formatRelativeLocale = {
//   yesterday: "'вчера в' p",
//   today: "'сегодня в' p",
//   tomorrow: DATE_FORMAT_HISTORY,
//   nextWeek: DATE_FORMAT_HISTORY,
//   lastWeek: DATE_FORMAT_HISTORY,
//   other: DATE_FORMAT_HISTORY,
// };

// export const locale = {
//   ...ru,
//   formatRelative: (token: string) => formatRelativeLocale[token],
// };

// export const HISTORY_COMMAND = {
//   addTag: 'добавил(а) новые метки',
//   unassignTag: 'удалил(а) метки',
//   assignUser: 'добавил(а) новых участников ',
//   unassignUser: 'удалил(а) участников',
//   changeDate: 'изменил(а) срок задачи',
//   changeStatus: 'сменил(а) статус задачи',
//   createTask: 'создал(а) задачу',
//   changeTitle: 'изменил(а) заголовок задачи',
//   assignFile: 'добавил(а) вложения',
//   unassignFile: 'удалил(а) вложение',
//   changeDescription: 'изменил(а) описание',
//   assignChecklist: 'добавил(а) чек-лист',
//   unassignChecklist: 'удалил(а) чек-лист',
//   сhangeTitleChecklist: 'изменил(а) название чек-листа',
//   createItemChecklist: 'добавил(а) новый пункт в чек-лист',
//   deleteItemChecklist: 'удалил(а) пункт в чек-листе'
// };

// export const HISTORY = {
//   taskCreate: 'task.create',
//   statusChange: 'task.status_change',
//   dateChange: 'task.exec_stop_change',
//   roleAssign: 'task.role_assign',
//   roleUnassign: 'task.role_un_assign',
//   tagAssign: 'task.tag_assign',
//   tagUnassign: 'task.tag_un_assign',
//   titleChange: 'task.title_change',
//   fileAssign: 'task.storage_file_assign',
//   fileUnassign: 'task.storage_file_un_assign',
//   descriptionChange: 'task.description_change',
//   checklistAssign: 'task.check_list_assign',
//   checklistUnassign: 'task.check_list_un_assign',
//   titleChecklistChange: 'check_list.title_change',
//   itemChecklistCreate: 'check_list.item_create',
//   itemChecklistDelete: 'check_list.item_delete'
// };

// export const HISTORY_MAP = {
//   'task.create': CreateTask,
//   'task.status_change': Status,
//   'task.exec_stop_change': DateTask,
//   // dateChange: 'task.exec_stop_change',
//   roleAssign: 'task.role_assign',
//   roleUnassign: 'task.role_un_assign',
//   tagAssign: 'task.tag_assign',
//   tagUnassign: 'task.tag_un_assign',
//   titleChange: 'task.title_change',
//   fileAssign: 'task.storage_file_assign',
//   fileUnassign: 'task.storage_file_un_assign',
//   descriptionChange: 'task.description_change',
//   checklistAssign: 'task.check_list_assign',
//   checklistUnassign: 'task.check_list_un_assign',
//   titleChecklistChange: 'check_list.title_change',
//   itemChecklistCreate: 'check_list.item_create',
//   itemChecklistDelete: 'check_list.item_delete'
// };
