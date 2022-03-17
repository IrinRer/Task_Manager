import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

export const getAuth = (state: RootState) => state.auth;
export const getIsAuthInProgress = (state: RootState) =>
  state.auth.authInProgress;
export const getToken = (state: RootState) => state.auth.token;
export const getUserData = (state: RootState) => state.auth.userData;

export const getAuthData = createSelector(
  getToken,
  getUserData,
  (token, userData) => {
    if (!token || !userData) {
      return null;
    }
    return {
      token,
      userData,
    };
  },
);
