import { RootState } from 'store';

export const getVerifyIdUser = (state: RootState) => state.verify.userID;
export const getVerifyError = (state: RootState) => state.verify.error;
