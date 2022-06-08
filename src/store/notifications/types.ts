import { AxiosError } from 'axios';
import { ROLES } from 'constants/types/common';

export const NOTIFICATIONS_SLICE_ALIAS = 'notifications';

export interface INotificationsReducer {
  notifications: INotification[];
  loading: boolean;
  error: AxiosError | null;
}

enum NotificationCommandCode {
  taskRoleUnassign = 'task.role_un_assign',
}
enum NotificationCommandName {
  taskRoleUnassign = 'Снятие с роли',
}
enum NotificationRelation {
  task = 'task',
}

export interface INotification {
  subscribe_notify_id: string;
  viewed: boolean;
  history_command: {
    history_command_id: string;
    command_code: NotificationCommandCode;
    command_name: NotificationCommandName;
    created: string;
    user: {
      user_id: string;
      name: string;
      logo: string;
    };
    params: {
      assign_user: {
        user_id: string;
        name: string;
      };
      task_role: {
        task_role_id: string;
        name: ROLES;
      };
      task: {
        task_id: string;
        title: string;
      };
    };
    relations: [
      {
        relation_type: NotificationRelation;
        relation_id: string;
        relation: {
          relation_id: string;
          title: string;
        };
      },
    ];
  };
}

export interface IGetNotificationsResponse {
  pagination: {
    items_count: number;
    items_total: number;
    per_page: number;
    page_current: number;
    page_total: number;
  };
  data: INotification[];
}

export interface IgetNotificationsArgs {
  viewed: boolean;
  page: number;
  per_page: number;
}

export interface IChangeNotificationViewedArgs {
  viewed: boolean;
  subscribe_notify_id: [string];
}
