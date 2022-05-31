import { ROLES } from './types/common';

export const RIGHTS = {
  /* any - любой авторизованный пользователь, может быть без роли для конкретной задачи */

  /* отслеживание задачи (через кнопку в виде глаза) */
  subscription: ['any'],

  /* право на отписку от задачи (через кнопку в виде глаза); */
  unsubscribe: [ROLES.watcher],

  /* создание задачи */
  createTask: ['any'],

  /* дублирование задачи */
  copyTask: [
    'any',
    ROLES.author,
    ROLES.watcher,
    ROLES.implementer,
    ROLES.responsible,
  ],

  /* перемещение задачи в архив */
  archive: [ROLES.author],

  /* удаление задачи */
  deleteTask: [ROLES.author],

  /* просмотр и скачивание вложений */
  showAttached: [
    'any',
    ROLES.author,
    ROLES.watcher,
    ROLES.implementer,
    ROLES.responsible,
  ],

  /* редактирование названия задачи */
  title: [ROLES.author, ROLES.responsible],

  /* добавление и изменение описания */
  description: [ROLES.author, ROLES.responsible],

  /* добавление и удаление чек-листа */
  checklist: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление, пометка (как выполненную) и удаление задачи в чек-листе */
  checklistItem: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление и удаление вложений */
  editAttached: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* добавление комментариев к задаче */
  comments: [ROLES.author, ROLES.watcher, ROLES.implementer, ROLES.responsible],

  /* удаление действий пользователей */
  deleteHistory: [ROLES.author, ROLES.responsible],

  /* изменение статуса задачи */
  status: [ROLES.author, ROLES.implementer, ROLES.responsible],

  /* установление, изменение и удаление срока завершения задачи */
  date: [ROLES.author, ROLES.responsible],

  /* установление, изменение и удаление приоритета задачи */
  priority: [ROLES.author, ROLES.responsible],

  /* добавление и удаление меток */
  tag: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли наблюдателя */
  editWatcher: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли исполнителя */
  editImplementer: [ROLES.author, ROLES.responsible],

  /* добавление и удаление участника в роли ответственного */
  editResponsible: [ROLES.author],
};
