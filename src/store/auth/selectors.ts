import { RootState } from 'store';

export const getToken = (state: RootState) => state.auth.token;
export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthError = (state: RootState) => state.auth.error;
