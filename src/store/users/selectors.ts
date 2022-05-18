import { RootState } from 'store/';
import { createSelector } from '@reduxjs/toolkit';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { IPopulatedUser, IUser } from './types';

const selectUsers = (state: RootState): Array<IUser> => state.users.users;

const selectUniqueUsers = createSelector(selectUsers, (users): Array<IUser> => {
  const uniqueUsersIds: Array<string> = [];
  const uniqueUsers: Array<IUser> = [];

  users.forEach((user) => {
    if (!uniqueUsersIds.includes(user.user_id)) {
      uniqueUsersIds.push(user.user_id);
      uniqueUsers.push(user);
    }
  });

  return uniqueUsers;
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
