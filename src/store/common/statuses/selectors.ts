import { RootState } from 'store/index';
import { createSelector } from '@reduxjs/toolkit';
import { TaskStatuses, TaskStatusName } from 'constants/types/common';
import { IPopulatedStatus, IStatus } from './types';

const selectOriginalStatuses = (state: RootState): Array<IStatus> =>
  state.common.statuses.statuses;

export const selectStatuses = createSelector(
  selectOriginalStatuses,
  (statuses): IStatus[] =>
    statuses
      .filter((status: IStatus) => status.name !== TaskStatuses.Rejected)
      .map((status: IStatus) => {
        return { ...status, name: TaskStatusName[status.name] };
      }),
);

export const selectPopulatedStatuses = createSelector(
  selectStatuses,
  (statuses): Array<IPopulatedStatus> =>
    statuses.map((status) => {
      return { ...status, label: status.name, value: status.task_status_id };
    }),
);

export const getCreatedStatusID = createSelector(
  selectStatuses,
  (statuses): string => {
    return (
      statuses.find((status: IStatus) => status.name === TaskStatuses.Created)
        ?.task_status_id || ''
    ); // find может возвращать undefined, хотя в нашем случае этого не должно бы быть? а если statuses не загрузились?
  },
);
