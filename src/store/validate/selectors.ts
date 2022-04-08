import { RootState } from 'store';

export const getValidateIdUser = (state: RootState) => state.valide.userID;
export const getValidateError = (state: RootState) => state.valide.error;
