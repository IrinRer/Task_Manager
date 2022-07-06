import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  COMMON_TAGS_SLICE_ALIAS,
  ICommonTagsReducer,
  ITag,
} from 'store/common/tags/types';
import { AxiosError } from 'axios';
import {
  createTagAction,
  editTagAction,
} from 'store/editTask/additionalFunctions/tag/thunk';
import { deleteTagAction, fetchTagsAction } from './thunk';

const initialState: ICommonTagsReducer = {
  tags: [],
  tag_delete: '',
  initialTag: [],
  loading: false,
  error: null,
};

export const commonTagsSlice = createSlice({
  name: COMMON_TAGS_SLICE_ALIAS,
  initialState,
  reducers: {
    setTagToDelete: (
      state: ICommonTagsReducer,
      action: PayloadAction<string | null>,
    ) => {
      state.tag_delete = action.payload;

      if(action.payload) {
        state.tags = state.tags.filter((item) => item.task_tag_id !== action.payload);
      } else {
        state.tags = state.initialTag;
      }
    },
  },
  extraReducers: {
    [fetchTagsAction.pending.type]: (state: ICommonTagsReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchTagsAction.fulfilled.type]: (
      state: ICommonTagsReducer,
      { payload }: PayloadAction<Array<ITag>>,
    ) => {
      state.tags = payload;
      state.initialTag = payload;
      state.loading = false;
    },
    [fetchTagsAction.rejected.type]: (
      state: ICommonTagsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tags = [];
      state.initialTag = [];
      state.loading = false;
      state.error = payload;
    },

    [createTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.tags?.push(payload);
      state.initialTag?.push(payload);
      state.loading = false;
    },

    [deleteTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.tags = state.tags?.filter((item) => item.name !== payload.name);
      state.tag_delete = '';
      state.initialTag = state.initialTag?.filter((item) => item.name !== payload.name);
      state.loading = false;
    },
    [deleteTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tags = initialState.tags;
      state.initialTag = initialState.initialTag
      state.loading = false;
      state.error = payload;
    },

    [editTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.tags = state.tags.map((item) => {
        if (item.task_tag_id === payload.task_tag_id) {
          return payload;
        }
        return item;
      });

      // eslint-disable-next-line
      state.initialTag = state.initialTag.map((item) => {
        if (item.task_tag_id === payload.task_tag_id) {
          return payload;
        }
        return item;
      });
      state.loading = false;
    },
    [editTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setTagToDelete } =  commonTagsSlice.actions;
export default commonTagsSlice.reducer;
