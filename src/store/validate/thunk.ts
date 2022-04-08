import { createAsyncThunk } from '@reduxjs/toolkit';
// import { notification } from 'antd';

import { VALID_SLICE_ALIAS } from 'store/validate/types';
import { axiosInstance } from 'network';

export const fetchValidAction = createAsyncThunk(
  `${VALID_SLICE_ALIAS}/fetchAll`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ladum/token/verify', {
        token: id,
      });
      return response.data.data.verify.id;
    } catch (error) {
      // notification.error({ message: 'Ошибка авторизации, проверьте логин!' });
      return rejectWithValue(error.message);
    }
  },
);
