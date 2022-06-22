import { IPriority } from 'store/common/priorities/types';

export type TRole = {
  task_to_role_id: string;
  task: { task_id: string };
  task_role: {
    task_role_id: string;
    name: ROLES;
    name_group: string;
    max_user_assigned: number;
    is_author: boolean;
    created: string;
    updated: string;
  };
  assign_user: {
    user_id: string;
    name: string;
    logo: string | null;
    permissions: Array<string>;
  };
};

export type TProgress = {
  percent: number;
  completed: number;
  total: number;
} | null;

export type TTask = {
  // task_id: string;
  // title: string;
  // created: string;
  progress: TProgress;
  roles: TRole[];
  // status: { name: string; task_status_id: string };
  // priority: null | { name: PriorityName };
  tags: TTag[];
  // storage_files_meta: { total: number };
  task_id: string;
  title: string;
  description: string;
  exec_start: string | null;
  exec_stop: string | null;
  created: string;
  updated: string;
  status: {
    task_status_id: string;
    name: string;
    form_result_required: false;
  };
  priority: IPriority | null;
  form: null;
  form_available: false;
  form_result: null;
  // roles: Array<ITaskRoles> | null;
  // tags: Array<ITag>;
  // progress: null;
  check_lists: [];
  storage_files: [];
  storage_files_meta: {
    total: number;
  };
  permissions: Array<string>;
};

export type TStatus = {
  task_status_id: string;
  name: string;
  name_group: string;
  form_result_required: boolean;
  created: string;
  updated: string;
};

export type TTag = {
  task_to_tag_id: string;
  task: {
    task_id: string;
  };
  task_tag: {
    task_tag_id: string;
    name: string;
    color: TagColor;
    created: string;
    updated: string;
  };
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
