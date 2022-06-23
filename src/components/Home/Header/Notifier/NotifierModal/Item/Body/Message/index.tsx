import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import {
  NotificationCommandName,
  NotificationMessageToShow,
} from 'constants/notify';
import React, { useContext } from 'react';
import CheckListItemCreate from './CheckLictItemCreate';
import CheckListTitleChange from './CheckListTitleChange';
import TaskStatusChange from './TaskStatusChange';
import styles from './index.module.scss';
import TaskRoleAssign from './TaskRoleAssign';
import TaskTagAssign from './TaskTagAssign';
import TaskTitleChange from './TaskTitleChange';

const Message = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  switch (notification.history_command.command_name) {
    case NotificationCommandName.descriptionEdit:
      return <div>{NotificationMessageToShow.descriptionEdit}</div>;
    case NotificationCommandName.taskCheckListUnassign:
      return <div>{NotificationMessageToShow.taskCheckListUnassign}</div>;
    case NotificationCommandName.taskStorageFileUnassign:
      return <div>{NotificationMessageToShow.taskStorageFileUnassign}</div>;
    case NotificationCommandName.priorityCancel:
      return <div>{NotificationMessageToShow.priorityCancel}</div>;
    case NotificationCommandName.taskTagUnassign:
      return <div>{NotificationMessageToShow.taskTagUnassign}</div>;
    case NotificationCommandName.taskCheckListAssign:
      return (
        <div>
          {NotificationMessageToShow.taskCheckListAssign}
          <span className={styles.accent}>
            {notification.history_command.params.check_list?.title}
          </span>
        </div>
      );
    case NotificationCommandName.checkListItemDelete:
      return (
        <div>
          {NotificationMessageToShow.checkListItemDelete}
          <span className={styles.accent}>
            {notification.history_command.params.check_list?.title}
          </span>
        </div>
      );
    case NotificationCommandName.checkListTitleChange:
      return (
        <CheckListTitleChange
          title={notification.history_command.params.check_list?.title || ''}
        />
      );
    case NotificationCommandName.checkListItemCreate:
      return (
        <CheckListItemCreate
          title={notification.history_command.params.check_list?.title || ''}
        />
      );
    case NotificationCommandName.taskStatusChange:
      return (
        <TaskStatusChange
          statusName={notification.history_command.params.status?.name || ''}
        />
      );
    case NotificationCommandName.taskRoleAssign:
      return (
        <TaskRoleAssign
          userId={
            notification.history_command.params.assign_user?.user_id || ''
          }
        />
      );
    case NotificationCommandName.taskTagAssign:
      return (
        <TaskTagAssign
          name={notification.history_command.params.tag?.name || ''}
          color={notification.history_command.params.tag?.color || ''}
        />
      );
    case NotificationCommandName.taskTitleChange:
      return (
        <TaskTitleChange
          title={notification.history_command.params.title || ''}
        />
      );
    default:
      return null;
  }
};

export default Message;
