import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../network';
import {
  IChangeNotificationViewedArgs,
  IgetNotificationsArgs,
  IGetNotificationsResponse,
  NOTIFICATIONS_SLICE_ALIAS,
} from './types';

export const loadNotificationsAction = createAsyncThunk(
  `${NOTIFICATIONS_SLICE_ALIAS}/loadNotifications`,
  async (args: IgetNotificationsArgs, { rejectWithValue }) => {
    try {
      const response: IGetNotificationsResponse = await api().get(
        `/api/v1.0/subscribe/notifies?viewed=${args.viewed}&page=${args.page}&per_page=${args.per_page}`,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeNotificationViewedAction = createAsyncThunk(
  `${NOTIFICATIONS_SLICE_ALIAS}/changeNotificationViewed`,
  async (args: IChangeNotificationViewedArgs, { rejectWithValue }) => {
    try {
      const response: IGetNotificationsResponse = await api().post(
        `/api/v1.0/subscribe/notifiesviewed-change`,
        args,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
