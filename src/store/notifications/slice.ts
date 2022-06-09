import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  changeNotificationViewedAction,
  loadNotificationsAction,
} from './thunk';
import {
  IGetNotificationsResponse,
  INotificationsReducer,
  NOTIFICATIONS_SLICE_ALIAS,
} from './types';

const initialState: INotificationsReducer = {
  notifications: [],
  newTotal: 0,
  veiewedTotal: 0,
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
      { payload }: PayloadAction<IGetNotificationsResponse>,
    ) => {
      state.loading = false;
      state.notifications = payload.data.data;
      state.newTotal = payload.data.pagination.items_total;
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
