import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTaskAction } from 'store/common/task/thunk';
import { IResponseTask } from 'store/common/task/types';
import { DATE_SLICE_ALIAS, IDateReducer } from './types';
import { createDateAction } from './thunk';


const initialState: IDateReducer = {
  dateStart: null,
  dateStop: null,
  loading: false,
  error: null,
};
export const prioritySlice = createSlice({
  name: DATE_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [createDateAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createDateAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IDateReducer>,
    ) => {
      state.dateStart = payload.dateStart;
      state.dateStop = payload.dateStop;
      state.loading = false;
    },
    [createDateAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.dateStart = null;
      state.dateStop = null;
      state.loading = false;
      state.error = payload;
    },

    [fetchTaskAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.dateStop = payload.exec_stop;
      state.loading = false;
    },
  },
});

export default prioritySlice.reducer;
