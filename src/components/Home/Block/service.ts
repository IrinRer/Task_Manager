import { BlockType } from 'constants/types/common';
import {
  getDoneTasksTotal,
  getDoneTasksSortedPaginated,
  getIncomingTasksTotal,
  getIncomingTasksSortedPaginated,
  getWorkTasksTotal,
  getWorkTasksSortedPaginated,
} from 'store/tasks/selectors';

// выбор селектора в зависимости от типа данных в блоке задач
export const getTasksSelector = (blockType: BlockType) => {
  switch (blockType) {
    case BlockType.in:
      return getIncomingTasksSortedPaginated;
    case BlockType.work:
      return getWorkTasksSortedPaginated;
    case BlockType.done:
      return getDoneTasksSortedPaginated;
    default:
      return getIncomingTasksSortedPaginated;
  }
};
export const getTotalTasksSelector = (blockType: BlockType) => {
  switch (blockType) {
    case BlockType.in:
      return getIncomingTasksTotal;
    case BlockType.work:
      return getWorkTasksTotal;
    case BlockType.done:
      return getDoneTasksTotal;
    default:
      return getIncomingTasksTotal;
  }
};
