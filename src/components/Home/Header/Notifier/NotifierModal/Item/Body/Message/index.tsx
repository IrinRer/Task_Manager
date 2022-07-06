import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { Command } from 'constants/notify';
import React, { useContext } from 'react';
import TaskStatusChange from './TaskStatusChange';
import TaskTagAssign from './TaskTagAssign';
import TaskTitleChange from './TaskTitleChange';
import TaskStorageFileAssign from './TaskStorageFileAssign';
import MessageAction from './MessageAction';
import TimeChange from './TimeChange';
import TaskPriorityChange from './TaskPriorityChange';
import TaskRoleChange from './TaskRoleChange';
import CheckListTitleChange from './CheckListTitleChange';
import CheckListItemChange from './CheckListItemChange';

const Message = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  switch (notification.history_command.command_name) {
    case Command.taskClone:
    case Command.descriptionEdit:
    case Command.taskCheckListUnassign:
    case Command.taskStorageFileUnassign:
    case Command.priorityCancel:
    case Command.taskTagUnassign:
    case Command.taskExecStopChange:
    case Command.taskExecStartChange:
      return <MessageAction />;

    case Command.checkListItemDelete:
    case Command.taskCheckListAssign:
      return <MessageAction />;

    case Command.taskStatusChange:
      return <TaskStatusChange />;

    case Command.taskRoleAssign:
    case Command.taskRoleUnassign:
      return <TaskRoleChange />;

    case Command.taskTitleChange:
      return <TaskTitleChange />;

    case Command.timeEndChange:
    case Command.timeStartChange:
      return <TimeChange />;

    case Command.taskTagAssign:
      return <TaskTagAssign />;

    case Command.taskPriorityChange:
      return <TaskPriorityChange />;

    case Command.checkListTitleChange:
      return <CheckListTitleChange />;

    case Command.checkListItemChangeComplete:
    case Command.checkListItemCreate:
      return <CheckListItemChange />;

    case Command.taskStorageFileAssign:
      return <TaskStorageFileAssign />;

    default:
      return null;
  }
};

export default Message;
