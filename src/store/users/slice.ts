import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USERS_SLICE_ALIAS, IUsersReducer, IUser } from 'store/users/types';
import { AxiosError } from 'axios';
import { fetchUsersAction } from './thunk';

const initialState: IUsersReducer = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: USERS_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsersAction.pending.type]: (state: IUsersReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUsersAction.fulfilled.type]: (
      state: IUsersReducer,
      { payload }: PayloadAction<Array<IUser>>,
    ) => {
      state.users = payload;
      state.loading = false;
    },
    [fetchUsersAction.rejected.type]: (
      state: IUsersReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.users = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default usersSlice.reducer;
