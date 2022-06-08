import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  changeNotificationViewedAction,
  loadNotificationsAction,
} from './thunk';
import {
  INotification,
  INotificationsReducer,
  NOTIFICATIONS_SLICE_ALIAS,
} from './types';

const initialState: INotificationsReducer = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: NOTIFICATIONS_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [loadNotificationsAction.pending.type]: (state: INotificationsReducer) => {
      state.loading = true;
      state.error = null;
    },
    [loadNotificationsAction.fulfilled.type]: (
      state: INotificationsReducer,
      { payload }: PayloadAction<INotification[]>,
    ) => {
      state.loading = false;
      state.notifications = payload;
    },
    [loadNotificationsAction.pending.type]: (
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
  },
});

// export const {} = notificationsSlice.actions;
export default notificationsSlice.reducer;
