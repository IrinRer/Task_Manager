import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import {
  NotificationCommandName,
  NotificationMessageToShow,
} from 'constants/notify';
import React, { useContext } from 'react';
import CheckListItemCreate from './CheckListItemCreate';
import CheckListTitleChange from './CheckListTitleChange';
import TaskStatusChange from './TaskStatusChange';
import styles from './index.module.scss';
import TaskRoleAssign from './TaskRoleAssign';
import TaskTagAssign from './TaskTagAssign';
import TaskTitleChange from './TaskTitleChange';
import TaskPriorityChange from './TaskPriorityChange';
import TimeEndChange from './TimeEndChange';
import TaskRoleUnassign from './TaskRoleUnassign';
import CheckListItemChangeComplete from './CheckListItemChangeComplete';
import TimeStartChange from './TimeStartChange';
import TaskStorageFileAssign from './TaskStorageFileAssign';

// eslint-disable-next-line
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
          message={notification.history_command.params.message || ''}
          complete={notification.history_command.params.complete || false}
        />
      );
    case NotificationCommandName.checkListItemChangeComplete:
      return (
        <CheckListItemChangeComplete
          title={notification.history_command.params.check_list?.title || ''}
          message={
            notification.history_command.params.check_list_item?.message || ''
          }
          complete={notification.history_command.params.complete || false}
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
    case NotificationCommandName.taskRoleUnassign:
      return (
        <TaskRoleUnassign
          userId={
            notification.history_command.params.assign_user?.user_id || ''
          }
        />
      );
    case NotificationCommandName.taskTagAssign:
      return notification.history_command.params.tag ? (
        <TaskTagAssign
          name={notification.history_command.params.tag.name || ''}
          color={notification.history_command.params.tag.color || ''}
        />
      ) : null;
    case NotificationCommandName.taskTitleChange:
      return (
        <TaskTitleChange
          title={notification.history_command.params.title || ''}
        />
      );
    case NotificationCommandName.taskPriorityChange:
      return notification.history_command.params.priority ? (
        <TaskPriorityChange
          priority={notification.history_command.params.priority.name}
        />
      ) : null;
    case NotificationCommandName.timeEndChange:
      return (
        <TimeEndChange
          time={notification.history_command.params.exec_stop || ''}
        />
      );
    case NotificationCommandName.timeStartChange:
      return (
        <TimeStartChange
          time={notification.history_command.params.exec_start || ''}
        />
      );
    case NotificationCommandName.taskExecStopChange:
      return <div>{NotificationMessageToShow.taskExecStopChange}</div>;
    case NotificationCommandName.taskExecStartChange:
      return <div>{NotificationMessageToShow.taskExecStartChange}</div>;
    case NotificationCommandName.taskStorageFileAssign:
      return notification.history_command.params.storage_file ? (
        <TaskStorageFileAssign
          file={notification.history_command.params.storage_file}
        />
      ) : null;

    default:
      return null;
  }
};

export default Message;
