import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  changeNotificationViewedAction,
  loadNewNotificationsAction,
  loadViewedNotificationsAction,
  setAllNotificationsViewedAction,
} from './thunk';
import {
  IGetNotificationsResponseData,
  INotification,
  INotificationsReducer,
  NOTIFICATIONS_SLICE_ALIAS,
} from './types';

const initialState: INotificationsReducer = {
  new: {
    pagination: {
      items_count: 0,
      items_total: 0,
      per_page: 50,
      page_current: 0,
      page_total: 0,
    },
    data: [],
  },
  viewed: {
    pagination: {
      items_count: 0,
      items_total: 0,
      per_page: 50,
      page_current: 0,
      page_total: 0,
    },
    data: [],
  },
  showCount: 1,
  allNotifications: [],
  notificationsToShow: [],
  showNotificationModal: false,
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: NOTIFICATIONS_SLICE_ALIAS,
  initialState,
  reducers: {
    setShowCount: (
      state: INotificationsReducer,
      { payload }: PayloadAction<number>,
    ) => {
      state.showCount = payload;
    },
    setShowNotificationModal: (
      state: INotificationsReducer,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.showNotificationModal = payload;
    },
    resetNotifications: () => initialState,
    resetNewNotifications: (state: INotificationsReducer) => {
      state.new = {
        pagination: {
          items_count: 0,
          items_total: 0,
          per_page: 50,
          page_current: 0,
          page_total: 0,
        },
        data: [],
      };
    },
    initNotificationsToShow: (state: INotificationsReducer) => {
      if (state.new.data.length > 0) {
        state.notificationsToShow = [state.new.data[0]];
      } else if (state.viewed.data.length > 0) {
        state.notificationsToShow = [state.viewed.data[0]];
      }
    },
    setNotificationsToShow: (
      state: INotificationsReducer,
      { payload }: PayloadAction<INotification[]>,
    ) => {
      state.notificationsToShow = payload;
    },
    incrementNewNotificationsPage: (state: INotificationsReducer) => {
      state.new.pagination.page_current += 1;
    },
    incrementViewedNotificationsPage: (state: INotificationsReducer) => {
      state.viewed.pagination.page_current += 1;
    },
  },
  extraReducers: {
    [loadNewNotificationsAction.pending.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = true;
      state.error = null;
    },
    [loadNewNotificationsAction.fulfilled.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<IGetNotificationsResponseData>,
    ) => {
      state.loading = false;
      state.new = payload;
      state.allNotifications = [...state.allNotifications, ...payload.data];
    },
    [loadNewNotificationsAction.rejected.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [loadViewedNotificationsAction.pending.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = true;
      state.error = null;
    },
    [loadViewedNotificationsAction.fulfilled.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<IGetNotificationsResponseData>,
    ) => {
      state.loading = false;
      state.viewed = payload;
      state.allNotifications = [...state.allNotifications, ...payload.data];
    },
    [loadViewedNotificationsAction.rejected.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [changeNotificationViewedAction.pending.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = true;
      state.error = null;
    },
    [changeNotificationViewedAction.fulfilled.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = false;
    },
    [changeNotificationViewedAction.pending.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [setAllNotificationsViewedAction.pending.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = true;
      state.error = null;
    },
    [setAllNotificationsViewedAction.fulfilled.type]: (
      state: INotificationsReducer,
    ) => {
      state.loading = false;
      state.allNotifications.forEach((notify) => {
        if (notify.viewed === false) {
          notify.viewed = true;
        }
      });
    },
    [setAllNotificationsViewedAction.pending.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setShowCount,
  initNotificationsToShow,
  setNotificationsToShow,
  incrementNewNotificationsPage,
  incrementViewedNotificationsPage,
  resetNewNotifications,
  setShowNotificationModal,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
