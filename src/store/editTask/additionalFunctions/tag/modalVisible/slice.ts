import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalVisibleReducer, MODAL_VISIBLE_SLICE_ALIAS } from './types';

const initialState: IModalVisibleReducer = {
  isModalVisibleMain: false,
  isModalVisibleCreate: false,
  isModalVisibleEdit: false,
  isModalVisibleDelete: false,
};

export const modalVisibleSlice = createSlice({
  name: MODAL_VISIBLE_SLICE_ALIAS,
  initialState,
  reducers: {
    setIsModalVisibleMain: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalVisibleMain = payload;
    },
    setIsModalVisibleCreate: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalVisibleCreate = payload;
    },
    setIsModalVisibleEdit: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalVisibleEdit = payload;
    },
    setIsVisibleModalDelete: (state, { payload }: PayloadAction<boolean>) => {
      state.isModalVisibleDelete = payload;
    },
  },
});

export const {
  setIsModalVisibleMain,
  setIsModalVisibleCreate,
  setIsModalVisibleEdit,
  setIsVisibleModalDelete,
} = modalVisibleSlice.actions;

export default modalVisibleSlice.reducer;
