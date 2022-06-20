import { deleteFile, viewFile } from 'store/editTask/attachments/thunk';
import { UploadFile } from 'antd/lib/upload/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPreviewReducer, PREVIEW_SLICE_ALIAS, IPayloadImgReceived } from './types';

const initialState: IPreviewReducer = {
  // previewImageRender: '',
  previewTitleRender: '',

  // previewImageReceived: '',
  previewTitleReceived: '',

  // fileRender: [],
  imgRecieved: [],

  index: 0,
  hover: false
};

export const previewSlice = createSlice({
  name: PREVIEW_SLICE_ALIAS,
  initialState,
  reducers: {
    setPreviewTitleRender: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleRender = payload;
    },

    cleanRender: (state) => {
      // state.previewImageRender = '';
      state.previewTitleRender = '';
    },

    setPreviewTitleReceived: (state, { payload }: PayloadAction<string>) => {
      state.previewTitleReceived = payload;
    },

    // setFileRender: (state, { payload }: PayloadAction<any>) => {
    //   state.fileRender.push(payload);
    // },

    setImgRecieved: (state, { payload }: PayloadAction<IPayloadImgReceived>) => {
      const arr = state.imgRecieved.concat(payload);
      state.imgRecieved = arr.filter(
        (item, i) => arr.findIndex((a) => a.name === item.name) === i,
      );      
    },

    setIndex: (state, { payload }: PayloadAction<number>) => {
      state.index = payload;     
    },
    setHover: (state, { payload }: PayloadAction<boolean>) => {
      state.hover = payload;     
    },
  },


  extraReducers: {
    [deleteFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      // state.fileRender = state.fileRender?.filter(
      //   (item) => item.name !== payload,
      // );
      // eslint-disable-next-line
      debugger
      state.imgRecieved = state.imgRecieved?.filter(
        (item) => item.name !== payload,
      );
    },
  },
});

export const {
  // setPreviewImageRender,
  setPreviewTitleRender,
  cleanRender,

  // setPreviewImageReceived,
  setPreviewTitleReceived,
  setImgRecieved,
  // setFileRender,

  setIndex,
  setHover
} = previewSlice.actions;
export default previewSlice.reducer;
