import { RootState } from 'store';

export const getHistory = (state: RootState) => state.history.data;

export const isLoading = (state: RootState) => state.history.loading;

export const totalCount = (state: RootState) => Number(state.history.count);

export const attachmentsAll = (state: RootState) => state.history.attachments;

