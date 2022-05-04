import { RootState } from 'store';

export const getAuthLoading = (state: RootState) => state.auth.token.loading;
export const getAuthError = (state: RootState) => state.auth.token.error;
export const getVerifyToken = (state: RootState) => state.auth.token.token;
