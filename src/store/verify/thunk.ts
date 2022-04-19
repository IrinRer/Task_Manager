import { createAsyncThunk } from '@reduxjs/toolkit';
// import { notification } from 'antd';

import { VERIFY_SLICE_ALIAS } from 'store/verify/types';
import { axiosInstance } from 'network';

export const fetchVerifyAction = createAsyncThunk(
  `${VERIFY_SLICE_ALIAS}/fetchAll`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ladum/token/verify', {
        token: id,
      });
      return response.data.data.verify.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
