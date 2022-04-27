import { createAsyncThunk } from '@reduxjs/toolkit';

import { VERIFY_SLICE_ALIAS } from 'store/auth/verify/types';
import { axiosInstance } from 'network';
import { resetToken } from 'helpers/usersInfo';

export const fetchVerifyAction = createAsyncThunk(
  `${VERIFY_SLICE_ALIAS}/verifyToken`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ladum/token/verify', {
        token: id,
      });
      return response.data.data.verify.id;
    } catch (error) {
      resetToken();
      return rejectWithValue(error.message);
    }
  },
);
