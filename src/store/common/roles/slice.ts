import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IRoles,
  IRolesReducer,
  ONETASK_SLICE_ROLES,
} from 'store/common/roles/types';
import { AxiosError } from 'axios';
import { fetchAllRoles } from './thunk';

const initialState: IRolesReducer = {
  loading: false,
  error: null,
  allroles: null,
};

export const rolesSlice = createSlice({
  name: ONETASK_SLICE_ROLES,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllRoles.pending.type]: (state: IRolesReducer) => {
      state.error = null;
    },
    [fetchAllRoles.fulfilled.type]: (
      state: IRolesReducer,
      { payload }: PayloadAction<IRoles[]>,
    ) => {
      state.allroles = payload;
    },
    [fetchAllRoles.rejected.type]: (
      state: IRolesReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.allroles = initialState.allroles;
      state.error = payload;
    },
  },
});

export default rolesSlice.reducer;
