import { ru } from 'date-fns/locale';

export const DATE_FORMAT_HISTORY = 'dd MMM yyyy, HH:mm';

export const formatRelativeLocale = {
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: DATE_FORMAT_HISTORY,
  nextWeek: DATE_FORMAT_HISTORY,
  lastWeek: DATE_FORMAT_HISTORY,
  other: DATE_FORMAT_HISTORY,
};

export const locale = {
  ...ru,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

export enum HISTORY_COMMAND {
  'addTag' = 'добавил(а) новые метки',
  'unassignTag' = 'удалил(а) метки',
  'assignUser' = 'добавил(а) новых участников ',
  'unassignUser' = 'удалил(а) участников',
  'changeDate' = 'изменил(а) срок задачи',
  'changeStatus' = 'сменил(а) статус задачи',
  'createTask' = 'создал(а) задачу',
  'changeTitle' = 'изменил(а) заголовок задачи',
  'assignFile' = 'добавил(а) вложения',
  'unassignFile' = 'удалил(а) вложение',
  'changeDescription' = 'изменил(а) описание',
  'assignChecklist' = 'добавил(а) чек-лист',
  'unassignChecklist' = 'удалил(а) чек-лист',
  'сhangeTitleChecklist' = 'изменил(а) название чек-листа',
  'createItemChecklist' = 'добавил(а) новый пункт в чек-лист',
  'deleteItemChecklist' = 'удалил(а) пункт в чек-листе',
  'completeItemChecklist' = 'отметил(а) пункты в чек-листе',
  'changePriority' = 'удалил(а) приоритет',
}

export enum HISTORY {
  'taskCreate' = 'task.create',
  'statusChange' = 'task.status_change',
  'dateChange' = 'task.exec_stop_change',
  'roleAssign' = 'task.role_assign',
  'roleUnassign' = 'task.role_un_assign',
  'tagAssign' = 'task.tag_assign',
  'tagUnassign' = 'task.tag_un_assign',
  'titleChange' = 'task.title_change',
  'fileAssign' = 'task.storage_file_assign',
  'fileUnassign' = 'task.storage_file_un_assign',
  'descriptionChange' = 'task.description_change',
  'checklistAssign' = 'task.check_list_assign',
  'checklistUnassign' = 'task.check_list_un_assign',
  'titleChecklistChange' = 'check_list.title_change',
  'itemChecklistCreate' = 'check_list.item_create',
  'itemChecklistDelete' = 'check_list.item_delete',
  'itemChecklistComplete' = 'check_list.item_change_complete',
  'priorityChange' = 'task.priority_change',
}

export const PRIORITY_CHANGE = 'изменил(а) приоритет задачи';
