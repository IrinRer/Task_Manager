import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskMembers, IMembersReducer, ONETASK_SLICE_MEMBERS } from 'store/members/types';
import { fetchAllMembers} from 'store/members/thunk';
import { AxiosError } from 'axios';

const initialState: IMembersReducer = {
  response: null,
  loading: false,
  error: null,
  members: null,
};

export const membersSlice = createSlice({
  name: ONETASK_SLICE_MEMBERS,
  initialState,
  reducers: {   
  },
  extraReducers: {
    [fetchAllMembers.pending.type]: (state: IMembersReducer) => {
      state.error = null;
    },
    [fetchAllMembers.fulfilled.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<ITaskMembers[]>,
    ) => {
      state.members = payload;
    },
    [fetchAllMembers.rejected.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.members = initialState.members;
      state.error = payload;
    },

  },
});

export default membersSlice.reducer;