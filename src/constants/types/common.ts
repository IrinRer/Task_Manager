export type TProgress = {
  percent: number;
  completed: number;
  total: number;
} | null;

export type TStatus = {
  task_status_id: string;
  name: string;
  name_group: string;
  form_result_required: boolean;
  created: string;
  updated: string;
};

export type TAvatarSize = AVATAR_SIZE.large | AVATAR_SIZE.medium;

export interface IUserAvatar<T> {
  obj: T;
  size?: TAvatarSize;
}

export enum BlockType {
  in = 'in',
  work = 'work',
  done = 'done',
}

// TaskStatuses используем для понятного написания id status-ов в selector вместо id
export enum TaskStatuses {
  Created = 'Создана',
  InProgress = 'В работе',
  Completed = 'Выполнена',
  NotDone = 'Не выполнена',
  Rejected = 'Отклонена',
}
// Для подмены имени статуса, поскольку они отличаются от бэкэнда
export enum TaskStatusName {
  'Создана' = 'Создана',
  'В работе' = 'В работе',
  'Выполнена' = 'Выполнена',
  'Не выполнена' = 'Приостановлена',
}

export enum PriorityName {
  Высокий = 0,
  Средний = 1,
  Низкий = 2,
}
export enum SortField {
  title = 'title',
  created = 'created',
  priority = 'priority',
  endDate = 'exec_stop',
}

// используется в thunk для изменения статуса
export interface IStatusChangeArg {
  task_id: string;
  task_status_id: string;
  exec_stop: string;
}

export enum TagColor {
  blue = 'blue',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  salad = 'green',
  yellow = 'yellow',
}

export enum ROLES {
  implementer = 'Исполнитель',
  author = 'Автор задачи',
  author_short = 'Автор',
  watcher = 'Наблюдатель',
  responsible = 'Ответственный',
  /* any - любой авторизованный пользователь, может быть без роли для конкретной задачи */
  any = 'any',
}

export type TTimer = ReturnType<typeof setTimeout> | null;
export enum AVATAR_SIZE {
  large = 'L',
  medium = 'M',
}
