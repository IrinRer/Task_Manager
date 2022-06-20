import { fetchTaskAction } from 'store/common/task/thunk';
import { IResponseTask } from 'store/common/task/types';
import { deleteFile } from 'store/editTask/attachments/thunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ATTACHMENTS_SLICE_ALIAS,
  IAttachmentsReducer,
  IPayloadFile,
} from 'store/editTask/attachments/types';
import { AxiosError } from 'axios';
import { assignFile, viewFile } from './thunk';

const initialState: IAttachmentsReducer = {
  data: [],
  viewFileImg: [],
  viewFileDoc: [],
  isClicked: false,
  loading: false,
  error: null,
};

export const attachmentsSlice = createSlice({
  name: ATTACHMENTS_SLICE_ALIAS,
  initialState,
  reducers: {
    setClickedAttachments: (state, action: PayloadAction<boolean>) => {
      state.isClicked = action.payload;
    },
  },
  extraReducers: {
    [assignFile.pending.type]: (state) => {
      state.loading = false;
      state.error = null;
    },

    [assignFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IPayloadFile>,
    ) => {
      if(!payload.type.includes('image')) {
        state.viewFileDoc.push(payload);
      }
      state.data.push(payload);
      state.loading = false;
    },

    [assignFile.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },

    [fetchTaskAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload?.storage_files;
      state.loading = false;
    },

    [deleteFile.pending.type]: (state) => {
      state.loading = false;
      state.error = null;
    },

    [deleteFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.data = state.data?.filter((item) => item.name_original !== payload);
      state.viewFileImg = state.viewFileImg?.filter((item) => item.name !== payload);
      state.loading = false;
    },

    [deleteFile.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },

    [viewFile.pending.type]: (state) => {
      state.loading = false;
      state.error = null;
    },

    [viewFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ name: string; url: string }>,
    ) => {
      const arr = state.viewFileImg.concat(payload);
      state.viewFileImg = arr.filter(
        (item, i) => arr.findIndex((a) => a.name === item.name) === i,
      );
      state.loading = false;
    },

    [viewFile.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setClickedAttachments } = attachmentsSlice.actions;
export default attachmentsSlice.reducer;
