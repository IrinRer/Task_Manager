import { RootState } from 'store';

export const getStatusesLoading = (state: RootState) => state.common.statuses.loading;
export const getStatusesError = (state: RootState) => state.common.statuses.error;
