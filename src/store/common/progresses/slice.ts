import { createSlice } from '@reduxjs/toolkit';
import {
  COMMON_PROGRESSES_SLICE_ALIAS,
  ICommonProgressesReducer,
} from 'store/common/progresses/types';
import progresses from './constants';

const initialState: ICommonProgressesReducer = {
  progresses,
  loading: false,
  error: null,
};

export const commonProgressesSlice = createSlice({
  name: COMMON_PROGRESSES_SLICE_ALIAS,
  initialState,
  reducers: {},
});

export default commonProgressesSlice.reducer;
