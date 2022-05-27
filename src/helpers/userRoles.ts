import { ROLES } from 'constants/task';
import { TTask } from 'constants/types/common';

// если пользователь с userId является автором задачи, то true
export const isUserTaskAuthor = (
  userId: string | null,
  task: TTask,
): boolean => {
  return (
    task.roles.find((role) => role.task_role.name === ROLES.author)?.assign_user
      .user_id === userId
  );
};

export const canUserChangeTaskStatus = (
  userId: string | null,
  task: TTask,
): boolean => {
  const validRoles = [ROLES.author, ROLES.implementer, ROLES.responsible];
  return (
    task.roles.find(
      (role) =>
        validRoles.includes(role.task_role.name) &&
        role.assign_user.user_id === userId,
    ) !== undefined
  );
};

export const canUserDuplicateTask = (
  userId: string | null,
  task: TTask,
): boolean => {
  const validRoles = [
    ROLES.author,
    ROLES.implementer,
    ROLES.responsible,
    ROLES.watcher,
  ];
  return (
    task.roles.find(
      (role) =>
        validRoles.includes(role.task_role.name) &&
        role.assign_user.user_id === userId,
    ) !== undefined
  );
};
