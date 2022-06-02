import { RootState } from 'store/';
import { createSelector } from '@reduxjs/toolkit';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { selectUniqueObjectsFromArray } from 'helpers/selectUniqueObjectsFromArray';
import { IPopulatedUser, IUser } from './types';

const selectUsers = (state: RootState): Array<IUser> => state.users.users;

const selectUniqueUsers = createSelector(selectUsers, (users): Array<IUser> => {
  return selectUniqueObjectsFromArray(users, 'user_id');
});

export const selectPopulatedUsers = createSelector(
  selectUniqueUsers,
  (users): Array<IPopulatedUser> =>
    users.map((user) => {
      return {
        ...user,
        value: user.name,
        key: user.user_id,
      };
    }),
);

export const getCurrentUser = createSelector(
  selectUsers,
  getVerifyIdUser,
  (users, id) => users.find((user) => user.user_id === id),
);
