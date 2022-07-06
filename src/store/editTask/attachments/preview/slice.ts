import { deleteFile } from 'store/editTask/attachments/thunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPreviewReducer,
  PREVIEW_SLICE_ALIAS,
  IPayloadImgReceived,
} from './types';

const initialState: IPreviewReducer = {
  previewTitleRender: '',
  previewTitleReceived: '',
  imgRecieved: [],
  loading: false,
  index: 0,
};

export const previewSlice = createSlice({
  name: PREVIEW_SLICE_ALIAS,
  initialState,
  reducers: {
    setPreviewTitleRender: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleRender = payload;
    },

    cleanRender: (state) => {
      state.previewTitleRender = '';
    },

    setPreviewTitleReceived: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleReceived = payload;
    },

    setImgRecieved: (
      state,
      { payload }: PayloadAction<IPayloadImgReceived>,
    ) => {
      const arr = state.imgRecieved.concat(payload);
      state.imgRecieved = arr.filter(
        (item, i) => arr.findIndex((a) => a.name === item.name) === i,
      );
      state.loading = true;
    },

    setIndex: (state, { payload }: PayloadAction<number>) => {
      state.index = payload;
    },
  },

  extraReducers: {
    [deleteFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.imgRecieved = state.imgRecieved?.filter(
        (item) => item.name !== payload,
      );
    },
  },
});

export const {
  setPreviewTitleRender,
  cleanRender,
  setPreviewTitleReceived,
  setImgRecieved,
  setIndex,
} = previewSlice.actions;
export default previewSlice.reducer;
