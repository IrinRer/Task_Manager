import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { historyAction } from './thunk';
import { HISTORY_SLICE_ALIAS, IHistoryReducer, IHistoryPayload } from './types';

const initialState: IHistoryReducer = {
  data: [],
  taskId: '',
  count: '',
  loading: false,
  error: null,
};

export const historySlice = createSlice({
  name: HISTORY_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [historyAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [historyAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IHistoryPayload>,
    ) => {
      if (state.taskId === payload.taskId) {
        const arr = state.data.concat(payload.data);
        arr.sort((a, b) => Number(new Date(b.created)) - Number(new Date(a.created)));
        state.data = arr.filter(
          (item, i) =>
            arr.findIndex(
              (a) => a.history_command_id === item.history_command_id,
            ) === i,
        );
      } else {
        state.data = payload.data;
        state.taskId = payload.taskId;
      }
      state.loading = false;
      state.count = payload.count;
    },
    [historyAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.data = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default historySlice.reducer;
