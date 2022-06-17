import { ROLES } from './types/common';

export enum RIGHTS_NAMES {
  'subscription' = 'subscription',
  'unsubscribe' = 'unsubscribe',
  'createTask' = 'createTask',
  'copyTask' = 'copyTask',
  'showAttached' = 'showAttached',
  'editTitle' = 'editTitle',
  'editDescription' = 'editDescription',
  'addChecklist' = 'addChecklist',
  'editChecklistItem' = 'editChecklistItem',
  'editAttached' = 'editAttached',
  'editComments' = 'editComments',
  'deleteHistory' = 'deleteHistory',
  'editStatus' = 'editStatus',
  'editTaskDate' = 'editTaskDate',
  'editPriority' = 'editPriority',
  'editTag' = 'editTag',
  'editWatcher' = 'editWatcher',
  'editImplementer' = 'editImplementer',
  'editResponsible' = 'editResponsible',
  'moveToArchive' = 'moveToArchive',
  'deleteTask' = 'deleteTask',
}

export type TRights =
  | ROLES.any
  | ROLES.author
  | ROLES.watcher
  | ROLES.implementer
  | ROLES.responsible;

export const RIGHTS: Record<RIGHTS_NAMES, Array<TRights>> = {
  /* any - любой авторизованный пользователь, может быть без роли для конкретной задачи */

  /* отслеживание задачи (через кнопку в виде глаза) */
  subscription: [ROLES.any],

  /* право на отписку от задачи (через кнопку в виде глаза); */
  unsubscribe: [ROLES.watcher],

  /* создание задачи */
  createTask: [ROLES.any],

  /* дублирование задачи */
  copyTask: [
    ROLES.any,
    ROLES.author,
    ROLES.watcher,
    ROLES.implementer,
    ROLES.responsible,
  ],

  /* удаление задачи */
  deleteTask: [ROLES.author],

  /* просмотр и скачивание вложений */
  showAttached: [
    ROLES.any,
    ROLES.author,
    ROLES.watcher,
    ROLES.implementer,
    ROLES.responsible,
  ],

  /* редактирование названия задачи */
  editTitle: [ROLES.author, ROLES.responsible],

  /* добавление и изменение описания */
  editDescription: [ROLES.author, ROLES.responsible],

  /* добавление и удаление чек-листа */
  addChecklist: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление, пометка (как выполненную) и удаление задачи в чек-листе */
  editChecklistItem: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление и удаление вложений */
  editAttached: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление комментариев к задаче */
  editComments: [
    ROLES.author,
    ROLES.watcher,
    ROLES.implementer,
    ROLES.responsible,
  ],

  /* удаление действий пользователей */
  deleteHistory: [ROLES.author, ROLES.responsible],

  /* изменение статуса задачи */
  editStatus: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* установление, изменение и удаление срока завершения задачи */
  editTaskDate: [ROLES.author, ROLES.responsible],

  /* установление, изменение и удаление приоритета задачи */
  editPriority: [ROLES.author, ROLES.responsible],

  /* добавление и удаление меток */
  editTag: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли наблюдателя */
  editWatcher: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли исполнителя */
  editImplementer: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли ответственного */
  editResponsible: [ROLES.author],

  /* перемещение задачи в архив */
  moveToArchive: [ROLES.author],
};
