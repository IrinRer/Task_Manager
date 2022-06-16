import { deleteFile } from 'store/editTask/attachments/thunk';
import { UploadFile } from 'antd/lib/upload/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPreviewReducer, PREVIEW_SLICE_ALIAS } from './types';

const initialState: IPreviewReducer = {
  previewImageRender: '',
  previewTitleRender: '',

  previewImageReceived: '',
  previewTitleReceived: '',

  fileRender: [],
  imgRecieved: []
};

export const previewSlice = createSlice({
  name: PREVIEW_SLICE_ALIAS,
  initialState,
  reducers: {
    setPreviewImageRender: (
      state,
      { payload }: PayloadAction<string | undefined>,
    ) => {
      state.previewImageRender = payload;
    },
    setPreviewTitleRender: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleRender = payload;
    },

    cleanRender: (state) => {
      state.previewImageRender = '';
      state.previewTitleRender = '';
    },

    setPreviewImageReceived: (
      state,
      { payload }: PayloadAction<string | undefined>,
    ) => {
      state.previewImageReceived = payload;
    },
    setPreviewTitleReceived: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleReceived = payload;
    },

    setFileRender: (state, { payload }: PayloadAction<any>) => {
      state.fileRender.push(payload);
    },

    setImgRecieved: (state, { payload }: PayloadAction<any>) => {
      state.imgRecieved.push(payload);
    },
  },

  extraReducers: {
    [deleteFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.fileRender= state.fileRender?.filter((item) => item.name !== payload);
      state.imgRecieved = state.imgRecieved?.filter((item) => item.name !== payload);
    },
  },
});

export const {
  setPreviewImageRender,
  setPreviewTitleRender,
  cleanRender,

  setPreviewImageReceived,
  setPreviewTitleReceived,
  setImgRecieved,
  setFileRender
} = previewSlice.actions;
export default previewSlice.reducer;
