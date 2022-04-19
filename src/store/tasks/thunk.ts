import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';
import { getBackendURL } from 'helpers/common';
import { getToken } from 'helpers/usersInfo';
import { TASKS_SLICE_ALIAS } from 'store/tasks/types';

export const fetchTasksAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.get('/api/v1.0/task/tasks');
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
);
