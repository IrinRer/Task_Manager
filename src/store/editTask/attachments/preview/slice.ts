import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPreviewReducer, PREVIEW_SLICE_ALIAS } from './types';

const initialState: IPreviewReducer = {
  previewImageRender: '',
  previewTitleRender: '',

  previewVisibleReceived: false,
  previewImageReceived: '',
  previewTitleReceived: ''
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
  },
});

export const {
  setPreviewImageRender,
  setPreviewTitleRender,
  cleanRender,
  
  setPreviewVisibleReceived,
  setPreviewImageReceived,
  setPreviewTitleReceived,

} = previewSlice.actions;
export default previewSlice.reducer;
