import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import { IPopulatedPriority, IPriority } from './types';

const selectPriorities = (state: RootState): Array<IPriority> =>
  state.common.priorities.priorities;

export const selectPopulatedPriorities = createSelector(
  selectPriorities,
  (priorities): Array<IPopulatedPriority> =>
    priorities.map((priority) => {
      return {
        ...priority,
        label: priority.name,
        value: priority.task_priority_id,
      };
    }),
);
