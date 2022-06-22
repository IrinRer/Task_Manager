import { RootState } from 'store';

export const getHistory = (state: RootState) => state.history.data;
