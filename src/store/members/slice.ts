import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskMembers, IMembersReducer, ONETASK_SLICE_MEMBERS } from 'store/members/types';
import { deleteTaskMemberAction, fetchAllMembers, setTaskMemberAction} from 'store/members/thunk';
import { AxiosError } from 'axios';
import { IResponseTask } from 'store/task/types';

const initialState: IMembersReducer = {
  response: null,
  loading: false,
  error: null,
  members: null,
  selectedMembers: null,
  unselectedMembers: null,
};

export const membersSlice = createSlice({
  name: ONETASK_SLICE_MEMBERS,
  initialState,
  reducers: {
    setNewSelectedMembers: (state: IMembersReducer, action: PayloadAction<string[]>) => {
      state.selectedMembers = action.payload;
    },
    setUnselectedMembers: (state: IMembersReducer, action: PayloadAction<string[]>) => {
      state.unselectedMembers = action.payload;
    },
  },
  extraReducers: {
    [setTaskMemberAction.pending.type]: (state: IMembersReducer) => {
      state.loading = true;
      state.error = null;
    },
    [setTaskMemberAction.fulfilled.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response= payload;
      state.loading = false;
    },
    [setTaskMemberAction.rejected.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },



    [deleteTaskMemberAction.pending.type]: (state: IMembersReducer) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTaskMemberAction.fulfilled.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [deleteTaskMemberAction.rejected.type]: (
      state: IMembersReducer,
      { payload }: PayloadAction<AxiosError>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },


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

export const { setNewSelectedMembers, setUnselectedMembers} = membersSlice.actions;
export default membersSlice.reducer;