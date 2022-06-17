import { RootState } from 'store';

export const getNewNotifications = (state: RootState) =>
  state.notifications.new.data;
export const getViewedNotifications = (state: RootState) =>
  state.notifications.viewed.data;
export const getNotificationsLoading = (state: RootState) =>
  state.notifications.loading;
export const getShowNotificationModal = (state: RootState) =>
  state.notifications.showNotificationModal;

export const getNewNotificationsStore = (state: RootState) =>
  state.notifications.new;
export const getViewedNotificationsStore = (state: RootState) =>
  state.notifications.viewed;

export const getTotalNotificationsCount = (state: RootState) =>
  state.notifications.new.pagination.items_total +
  state.notifications.viewed.pagination.items_total;
export const getAllNotificationsLength = (state: RootState) =>
  state.notifications.allNotifications.length;

// export const getNotificationsToShow = (state: RootState) =>
//   state.notifications.notificationsToShow;
export const getNotificationsToShow = (state: RootState) =>
  state.notifications.allNotifications.slice(0, state.notifications.showCount);

export const getNewTotal = (state: RootState) =>
  state.notifications.new.pagination?.items_total;

export const getIsNewNotifications = (state: RootState) =>
  state.notifications.new.data.length > 0;

export const getShowCount = (state: RootState) => state.notifications.showCount;
