import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ATTACHMENTS_SLICE_ALIAS, IAttachmentsReducer} from 'store/attachments/types';
import { AxiosError } from 'axios';


const initialState: IAttachmentsReducer = {
  isClicked: false,
};

export const attachmentsSlice = createSlice({
  name: ATTACHMENTS_SLICE_ALIAS,
  initialState,
  reducers: {
    setClickedAttachments: (state, action: PayloadAction<boolean>) => {
      state.isClicked = action.payload;
    },
  },
  extraReducers: {},
});

export const { setClickedAttachments } = attachmentsSlice.actions;
export default attachmentsSlice.reducer;
