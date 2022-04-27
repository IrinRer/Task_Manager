
import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import { IPopulatedStatus, IStatus } from './types';

const selectStatuses = (state: RootState): Array<IStatus> =>
  state.common.statuses.statuses;

export const selectPopulatedStatuses = createSelector(
  selectStatuses,
  (statuses): Array<IPopulatedStatus> =>
    statuses.map((status) => {
      return { ...status, label: status.name, value: status.task_status_id };
    }),
);
