import { createAsyncThunk } from '@reduxjs/toolkit';

import { VERIFY_SLICE_ALIAS } from 'store/auth/verify/types';
import { api } from 'network';
import { resetToken } from 'helpers/cookies';
import { addVerifyToken } from '../token/slice';

export const fetchVerifyAction = createAsyncThunk(
  `${VERIFY_SLICE_ALIAS}/verifyToken`,
  async (token: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api(true).post('/ladum/token/verify', {
        token,
      });
      dispatch(addVerifyToken(token!));
      return response.data.data.verify.id;
    } catch (error) {
      resetToken();
      return rejectWithValue(error.message);
    }
  },
);
