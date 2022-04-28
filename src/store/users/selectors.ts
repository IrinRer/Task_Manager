import { RootState } from 'store/';
import { createSelector } from '@reduxjs/toolkit';
import { IPopulatedUser, IUser } from './types';

const selectUsers = (state: RootState): Array<IUser> => state.users.users;

export const selectPopulatedUsers = createSelector(
  selectUsers,
  (users): Array<IPopulatedUser> =>
    users.map((user) => {
      return {
        ...user,
        value: user.name,
        key: user.user_id,
      };
    }),
);
