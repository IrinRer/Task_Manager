import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ATTACHMENTS_SLICE_ALIAS, IAttachmentsReducer} from 'store/attachments/types';
import { AxiosError } from 'axios';
import { createPlaceFile } from './thunk';


const initialState: IAttachmentsReducer = {
  data: [],
  isClicked: false,
  loading: false,
  error: null
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
    [createPlaceFile.pending.type]: (
      state
    ) => {
      state.loading = false;
      state.error = null;
    },

    [createPlaceFile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      state.data = payload;
      state.loading = false;
    },

    [createPlaceFile.rejected.type]: (
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
