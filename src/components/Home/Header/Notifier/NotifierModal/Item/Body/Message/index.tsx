import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import {
  Command,
  NotificationMessageToShow,
  NOTIFY_MESSAGE,
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
    case Command.descriptionEdit:
      return <div>{NotificationMessageToShow.descriptionEdit}</div>;
    case Command.taskCheckListUnassign:
      return (
        <div>{NOTIFY_MESSAGE[notification.history_command.command_name]}</div>
      );
    case Command.taskStorageFileUnassign:
      return <div>{NotificationMessageToShow.taskStorageFileUnassign}</div>;
    case Command.priorityCancel:
      return <div>{NotificationMessageToShow.priorityCancel}</div>;
    case Command.taskTagUnassign:
      return <div>{NotificationMessageToShow.taskTagUnassign}</div>;

    case Command.taskCheckListAssign:
      return (
        <div>
          {NotificationMessageToShow.taskCheckListAssign}
          <span className={styles.accent}>
            {notification.history_command.params.check_list?.title}
          </span>
        </div>
      );
    case Command.checkListItemDelete:
      return (
        <div>
          {NotificationMessageToShow.checkListItemDelete}
          <span className={styles.accent}>
            {notification.history_command.params.check_list?.title}
          </span>
        </div>
      );
    case Command.checkListTitleChange:
      return (
        <CheckListTitleChange
          title={notification.history_command.params.check_list?.title || ''}
        />
      );
    case Command.checkListItemCreate:
      return (
        <CheckListItemCreate
          title={notification.history_command.params.check_list?.title || ''}
          message={notification.history_command.params.message || ''}
          complete={notification.history_command.params.complete || false}
        />
      );
    case Command.checkListItemChangeComplete:
      return (
        <CheckListItemChangeComplete
          title={notification.history_command.params.check_list?.title || ''}
          message={
            notification.history_command.params.check_list_item?.message || ''
          }
          complete={notification.history_command.params.complete || false}
        />
      );
    case Command.taskStatusChange:
      return (
        <TaskStatusChange
          statusName={notification.history_command.params.status?.name || ''}
        />
      );
    case Command.taskRoleAssign:
      return (
        <TaskRoleAssign
          userId={
            notification.history_command.params.assign_user?.user_id || ''
          }
        />
      );
    case Command.taskRoleUnassign:
      return (
        <TaskRoleUnassign
          userId={
            notification.history_command.params.assign_user?.user_id || ''
          }
        />
      );
    case Command.taskTagAssign:
      return notification.history_command.params.tag ? (
        <TaskTagAssign
          name={notification.history_command.params.tag.name || ''}
          color={notification.history_command.params.tag.color || ''}
        />
      ) : null;
    case Command.taskTitleChange:
      return (
        <TaskTitleChange
          title={notification.history_command.params.title || ''}
        />
      );
    case Command.taskPriorityChange:
      return notification.history_command.params.priority ? (
        <TaskPriorityChange
          priority={notification.history_command.params.priority.name}
        />
      ) : null;
    case Command.timeEndChange:
      return (
        <TimeEndChange
          time={notification.history_command.params.exec_stop || ''}
        />
      );
    case Command.timeStartChange:
      return (
        <TimeStartChange
          time={notification.history_command.params.exec_start || ''}
        />
      );
    case Command.taskExecStopChange:
      return <div>{NotificationMessageToShow.taskExecStopChange}</div>;
    case Command.taskExecStartChange:
      return <div>{NotificationMessageToShow.taskExecStartChange}</div>;
    case Command.taskStorageFileAssign:
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
