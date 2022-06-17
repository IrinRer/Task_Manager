import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { api } from '../../network';
import { resetNewNotifications } from './slice';
import {
  IChangeNotificationViewedArgs,
  IGetNotificationsResponse,
  NOTIFICATIONS_SLICE_ALIAS,
} from './types';

export const loadNewNotificationsAction = createAsyncThunk(
  `${NOTIFICATIONS_SLICE_ALIAS}/loadNewNotifications`,
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      const response: IGetNotificationsResponse = await api().get(
        `/api/v1.0/subscribe/notifies?viewed=false&page=${
          state.notifications.new.pagination?.page_current || 1
        }&per_page=${state.notifications.new.pagination?.per_page}`,
      );

      if (response.data.data.length === 0) {
        dispatch(loadViewedNotificationsAction());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadViewedNotificationsAction = createAsyncThunk(
  `${NOTIFICATIONS_SLICE_ALIAS}/loadViewedNotifications`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;

      const response: IGetNotificationsResponse = await api().get(
        `/api/v1.0/subscribe/notifies?viewed=true&page=${
          state.notifications.viewed.pagination?.page_current || 1
        }&per_page=${state.notifications.viewed.pagination?.per_page}`,
      );
      return response.data;
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
        `/api/v1.0/subscribe/notifies/viewed-change`,
        args,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const setAllNotificationsViewedAction = createAsyncThunk(
  `${NOTIFICATIONS_SLICE_ALIAS}/setAllNotificationsViewed`,
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      let idsToView: string[] | [] = [];

      // Получаем все непрочитанные уведомления
      const response: IGetNotificationsResponse = await api().get(
        `/api/v1.0/subscribe/notifies?viewed=false&page=1&per_page=${state.notifications.new.pagination?.items_total}`,
      );

      // Создаем массив с id уведомлений
      if (response.data.data.length > 0) {
        idsToView = response.data.data.map(
          (notify) => notify.subscribe_notify_id,
        );
      }

      // Запрос на установление статусов. Ответ - пустой массив, поэтому не обрабатываем
      await api().post(`/api/v1.0/subscribe/notifies/viewed-change`, {
        viewed: true,
        subscribe_notify_id: idsToView,
      });

      // Обнуляем новые уведомления в сторе
      dispatch(resetNewNotifications());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
