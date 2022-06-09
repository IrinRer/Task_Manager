import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getNotifications = (state: RootState) =>
  state.notifications.notifications;

export const getNewTotal = (state: RootState) => state.notifications.newTotal;

export const getIsNewNotifications = createSelector(
  getNotifications,
  (notifications) => {
    return (
      notifications.filter((notification) => notification.viewed === false)
        .length > 0
    );
  },
);
