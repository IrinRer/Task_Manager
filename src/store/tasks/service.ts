import {
  BlockType,
  PriorityName,
  SortField,
  TaskStatuses,
  TTask,
  UserRoles,
} from 'constants/types/common';
import { TEST_USER_ID } from './selectors';
import { TAllViewParameters, TViewParameters } from './types';

export const getMyTasks = (tasks: TTask[], onlyMyTasks: boolean): TTask[] =>
  onlyMyTasks
    ? tasks.filter((task) => {
        return (
          task.roles.find(
            (role) =>
              role.task_role.name === UserRoles.executor &&
              Number(role.assign_user.user_id) === TEST_USER_ID,
          ) !== undefined
        );
      })
    : tasks;

export const blockTasks = (tasks: TTask[], blockType: BlockType): TTask[] => {
  if (blockType === BlockType.in) {
    return tasks.filter(
      (task) =>
        task.status.name === TaskStatuses.Created ||
        task.status.name === TaskStatuses.NotDone,
    );
  }
  if (blockType === BlockType.work) {
    return tasks.filter((task) => task.status.name === TaskStatuses.InProgress);
  }
  return tasks.filter((task) => task.status.name === TaskStatuses.Completed);
};

export const blockTasksTotal = (
  tasks: TTask[],
  blockType: BlockType,
): number => {
  return blockTasks(tasks, blockType).length;
};

// Возвращает отрицательное число если первый больше второго, 0 если равны и положительное если второй больше
// Используется для сортировки задач по полю sortField

export const isFirstGTSecond = (
  firstTask: TTask,
  secondTask: TTask,
  sortField: SortField,
): number => {
  if (sortField === 'priority') {
    // Если приоритета нет, то назначаем самый низкий рейтинг задаче - 3. Если есть - индекс приоритета
    return (
      (firstTask.priority ? +PriorityName[firstTask.priority.name] : 3) -
      (secondTask.priority ? +PriorityName[secondTask.priority.name] : 3)
    );
  }

  if (
    firstTask[sortField].toLowerCase() < secondTask[sortField].toLowerCase()
  ) {
    return -1;
  }
  if (
    firstTask[sortField].toLowerCase() === secondTask[sortField].toLowerCase()
  ) {
    return 0;
  }
  return 1;
};

// Возвращает сортированный список задач обрезанный по странице page с числом задач на странице tasksOnPage
export const sortPaginate = (
  tasks: TTask[],
  viewParameters: TViewParameters,
): TTask[] => {
  const { sortField, page, tasksOnPage } = viewParameters;
  return tasks
    .sort((a, b) => isFirstGTSecond(a, b, sortField))
    .slice((page - 1) * tasksOnPage, page * tasksOnPage);
};

export const getTasksSortedPaginated = (
  tasks: TTask[],
  viewParameters: TAllViewParameters,
  blockType: BlockType,
): TTask[] => {
  return sortPaginate(blockTasks(tasks, blockType), viewParameters[blockType]);
};
