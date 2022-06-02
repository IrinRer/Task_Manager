import { MY_TASKS_ROLES } from 'constants/common';
import {
  BlockType,
  PriorityName,
  SortField,
  TaskStatuses,
  TTask,
} from 'constants/types/common';
import { compareDates, compareStrings } from 'helpers/compareTasks';
import { TAllViewParameters, TViewParameters } from './types';

// const isMyTask = (role:TRole):boolean => {
//   return MY_TASKS_ROLES.includes(role.task_role.name) && role.assign_user.user_id === userId;
//   }

export const getMyTasks = (
  tasks: TTask[],
  onlyMyTasks: boolean,
  userId: string,
): TTask[] => {
  return onlyMyTasks
    ? tasks.filter((task) => {
        return (
          task.roles.find(
            (role) =>
              MY_TASKS_ROLES.includes(role.task_role.name) &&
              role.assign_user.user_id === userId,
          ) !== undefined
        );
      })
    : tasks;
};

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
  if (sortField === SortField.priority) {
    // Если приоритета нет, то назначаем самый низкий рейтинг задаче - 3. Если есть - индекс приоритета
    return (
      (firstTask.priority ? +PriorityName[firstTask.priority.name] : 3) -
      (secondTask.priority ? +PriorityName[secondTask.priority.name] : 3)
    );
  }
  if (sortField === SortField.title) {
    return compareStrings(firstTask.title, secondTask.title);
  }

  if (sortField === SortField.created || sortField === SortField.endDate) {
    return compareDates(firstTask[sortField], secondTask[sortField]);
  }
  return 0;
};

// Возвращает сортированный список задач обрезанный по странице page с числом задач на странице tasksOnPage
export const sortPaginate = (
  tasks: TTask[],
  viewParameters: TViewParameters,
): TTask[] => {
  const { sortField, page, tasksOnPage } = viewParameters;
  const sortedTasks = tasks.sort((a, b) => isFirstGTSecond(a, b, sortField));
  if (sortField === SortField.created) {
    sortedTasks.reverse();
  }
  return sortedTasks.slice((page - 1) * tasksOnPage, page * tasksOnPage);
};

export const getTasksSortedPaginated = (
  tasks: TTask[],
  viewParameters: TAllViewParameters,
  blockType: BlockType,
): TTask[] => {
  return sortPaginate(blockTasks(tasks, blockType), viewParameters[blockType]);
};
