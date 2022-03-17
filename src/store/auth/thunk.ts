import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

// import { auth } from 'network';

import { AUTH_SLICE_ALIAS } from 'store/auth/types';

export const fetchUserDataAction = createAsyncThunk(
  `${AUTH_SLICE_ALIAS}/fetchUserData`,
  async (token: string, { rejectWithValue }) => {
    try {
      return {
        token,
        userData: {
          user_id: 1,
          email: 'test',
          full_name: 'test test',
        },
      };
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(JSON.parse(JSON.stringify(error)));
    }
  },
);
