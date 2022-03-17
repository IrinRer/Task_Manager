import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';

import { getBackendURL } from 'helpers/common';

import { TASKS_SLICE_ALIAS } from 'store/tasks/types';

export const fetchTasksAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Доставать token необходимо из cookie
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NDc1MjA1Njl9.lAA4ASRy8JglzDix1pFtaEqGztoJmQmumw6mknvrn8xS5cEiQ7fNLiAKqDJ1BMQ_dewhehcW7MSw5C8A9g2xwOrfp7AcXg6Ps0FSsgEamsVgwuBx4emaufL6PI0gp0S6CGH3PIrcaAzVAbKuvSVK8gU0sd5yH45CpQ3NvBA07XXBuIjKgLfCqHXJfKnpSp6u5M9YP2xE66wiY5GZFTXsjinwhhdw6XxSycmhWTqZYaJafaKhxU1YTaj8KpPrkjz5Xi-jRxEvoKvADDaXWlWHRd0fZ6eMnzQ5gDFIXH4Ce7M7_bupLN75xLMoRkkgAfgc9KDtiVhAXnwy2r_g667JKtsxBwGIIk8Yh7ZUC5jTXMg993_O_kMIfGaVpdvMvUDdiuZkZoMWKxF4NDyESVigDxRwXTzaM6lJjy0q2ESZf3r-p_nh87Kf6qiDX4zBpsa1_8U_I-x0sMWyXOCh762TS87dSZyvbNJGEet6cmJu2poAM2JnLJIHkxW-1n5euAqmutjkbXqQMTuwgzIBbCtoj8TCrFcTDH9xVtBAlwqnnoyBNpUgKnrPPzKXPmoVP7AQdp9j4p_B31f-Cgi3AszdP1UGHLoYcK5Thzy6715LBXjcFJR5pIFsni9Ho6ZuV4Qwvv9Od5C0RTfVq5PRvlvhxKWlK2_jsJ6pG5V90iWh_Sw';
      // TODO: Вынести для переиспользования в других запросах
      const axiosInstance = axios.create({
        baseURL: getBackendURL(),
        headers: { Authorization: `Bearer ${token}` },
      });
      // ^^
      const response = await axiosInstance.get('/api/v1.0/task/tasks');
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
);
