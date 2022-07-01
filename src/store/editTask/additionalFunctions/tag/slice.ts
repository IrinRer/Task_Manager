import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  assignTagAction,
  createTagAction,
  editTagAction,
  unassignTagAction,
} from 'store/editTask/additionalFunctions/tag/thunk';
import { deleteTagAction } from 'store/common/tags/thunk';
import { IResponseTask } from 'store/common/task/types';
import { fetchTaskAction } from 'store/common/task/thunk';
import { ITag } from 'store/common/tags/types';
import { TAG_SLICE_ALIAS, ITagReducer } from './types';

const initialState: ITagReducer = {
  sentTag: [],
  tag_delete: '',
  initialTag: [],
  loading: false,
  error: null,
};

export const tagSlice = createSlice({
  name: TAG_SLICE_ALIAS,
  initialState,
  reducers: {
    setAssignTagToDelete: (
      state: ITagReducer,
      action: PayloadAction<string | null>,
    ) => {
      state.tag_delete = action.payload;

      if(action.payload) {
        state.sentTag = state.sentTag.filter((item) => item.task_tag_id !== action.payload);
      } else {
        state.sentTag = state.initialTag;
      }
    },
  },
  extraReducers: {
    [createTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag?.push(payload);
      state.initialTag?.push(payload);
      state.loading = false;
    },
    [createTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [assignTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [assignTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag?.push(payload);
      state.loading = false;
    },
    [assignTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },

    // нужен, чтобы получить теги для задачи, если они у нее уже есть
    // и отобразить их
    [fetchTaskAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.sentTag = payload.tags.map(({ task_tag }) => task_tag);
      state.initialTag = payload.tags.map(({ task_tag }) => task_tag);
      state.loading = false;
    },

    [unassignTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [unassignTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<string>,
    ) => {
      state.sentTag = state.sentTag?.filter((item) => item.name !== payload);
      state.initialTag = state.initialTag?.filter((item) => item.name !== payload);
      state.loading = false;
    },
    [unassignTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },

    [deleteTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag = state.sentTag?.filter(
        (item) => item.name !== payload.name,
      );
      state.initialTag = state.initialTag?.filter(
        (item) => item.name !== payload.name,
      );
      state.loading = false;
    },

    [editTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag = state.sentTag?.map((item) => {
        if (item.task_tag_id === payload.task_tag_id) {
          return payload;
        }
        return item;
      });

      // eslint-disable-next-line
      state.initialTag = state.initialTag?.map((item) => {
        if (item.task_tag_id === payload.task_tag_id) {
          return payload;
        }
        return item;
      });
      state.loading = false;
    },
  },
});

export const {  setAssignTagToDelete } =  tagSlice.actions;
export default tagSlice.reducer;
