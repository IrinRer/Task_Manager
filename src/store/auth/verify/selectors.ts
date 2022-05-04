import { RootState } from 'store';

export const getVerifyIdUser = (state: RootState) => state.auth.verify.userID;
export const getVerifyError = (state: RootState) => state.auth.verify.error;
export const getVerifyLoading = (state: RootState) => state.auth.verify.loading;
