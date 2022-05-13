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
