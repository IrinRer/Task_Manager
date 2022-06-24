import { RootState } from 'store';

export const getHistory = (state: RootState) => state.history.data;

export const isLoading = (state: RootState) => state.history.loading
