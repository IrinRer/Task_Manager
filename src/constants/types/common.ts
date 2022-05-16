export type TRole = {
  task_to_role_id: string;
  task: { task_id: string };
  task_role: {
    task_role_id: string;
    name: UserRoles;
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
  };
};

export type TProgress = {
  percent: number;
  completed: number;
  total: number;
} | null;

export type TTask = {
  task_id: string;
  title: string;
  created: string;
  progress: TProgress;
  roles: TRole[];
  status: { name: string; task_status_id: string };
  priority: null | { name: PriorityName };
  tags: TTag[];
  storage_files_meta: { total: number };
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
    color: string;
    created: string;
    updated: string;
  };
};

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
  endDate = 'created',
}
export enum UserRoles {
  executor = 'Исполнитель',
  author = 'Автор задачи',
  watcher = 'Наблюдатель',
  responsible = 'Ответственный',
}
