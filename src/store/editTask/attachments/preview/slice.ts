import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPreviewReducer, PREVIEW_SLICE_ALIAS } from './types';

const initialState: IPreviewReducer = {
  previewVisibleRender: false,
  previewImageRender: '',
  previewTitleRender: '',
  previewFileRender: [],

  previewVisibleReceived: false,
  previewImageReceived: '',
  previewTitleReceived: '',
  previewFileReceived: [],
};

export const previewSlice = createSlice({
  name: PREVIEW_SLICE_ALIAS,
  initialState,
  reducers: {
    setPreviewVisibleRender: (state, { payload }: PayloadAction<boolean>) => {
      state.previewVisibleRender = payload;
    },
    setPreviewImageRender: (
      state,
      { payload }: PayloadAction<string | undefined>,
    ) => {
      state.previewImageRender = payload;
    },
    setPreviewTitleRender: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleRender = payload;
    },

    setPreviewFileRender: (state, { payload }: PayloadAction<any>) => {
      state.previewFileRender = payload;
    },

    setPreviewVisibleReceived: (state, { payload }: PayloadAction<boolean>) => {
      state.previewVisibleReceived = payload;
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
    setPreviewFileReceived: (state, { payload }: PayloadAction<any>) => {
      state.previewFileReceived = payload;
    },
  },
});

export const {
  setPreviewVisibleRender,
  setPreviewImageRender,
  setPreviewTitleRender,
  setPreviewFileRender,

  setPreviewVisibleReceived,
  setPreviewImageReceived,
  setPreviewTitleReceived,
  setPreviewFileReceived,

} = previewSlice.actions;
export default previewSlice.reducer;
