import { notification } from 'antd';
import { api } from 'network';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DATE_SLICE_ALIAS, IDate } from './types';

export const createDateAction = createAsyncThunk(
  `${DATE_SLICE_ALIAS}/createDate`,
  async (date: IDate, { rejectWithValue }) => {
    try {
      const responseDataStart = await api().post(
        `/api/v1.0/task/tasks/${date.task_id}/exec-start-change`,
        { exec_start: date.dateStart },
      );

      const responseDataStop = await api().post(
        `/api/v1.0/task/tasks/${date.task_id}/exec-stop-change`,
        { exec_stop: date.dateStop },
      );
      return {
        dateStart: responseDataStart.data.data.exec_start,
        dateStop: responseDataStop.data.data.exec_stop,
      };
    } catch (error) {
      notification.error({ message: 'Некорректная дата!' });
      return rejectWithValue(error);
    }
  },
);
