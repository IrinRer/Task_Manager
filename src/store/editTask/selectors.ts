import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  isAuthor,
  isImplementer,
  isResponsible,
  getUsersFromRoles,
  getUsersIdFromRoles,
  isWatcher,
} from 'store/common/task/selectors';
import { ICheckList } from '../common/task/types';
import { TProgress } from '../../constants/types/common';
import { getVerifyIdUser } from '../auth/verify/selectors';

export const getModalVisible = (state: RootState) =>
  state.editTask.editTaskReducer.modalVisible;

export const getNewSelectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.selectedMembers;

export const getOneNewSelectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.selectedMembers?.pop();

export const getUnselectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.unselectedMembers;

export const taskRoles = (state: RootState) =>
  state.editTask.editTaskReducer.data?.roles;

export const getTask = (state: RootState) =>
  state.editTask.editTaskReducer.data;

export const getTaskId = (state: RootState) =>
  state.editTask.editTaskReducer.data?.task_id;

export const getTitle = (state: RootState) =>
  state.editTask.editTaskReducer.data?.title;

export const getDescription = (state: RootState) =>
  state.editTask.editTaskReducer.data?.description;

export const getTaskStatus = (state: RootState) =>
  state.editTask.editTaskReducer.data?.status?.name;

export const getTaskAuthor = createSelector(
  taskRoles,
  (roles) => roles?.find(isAuthor)?.assign_user,
);

export const getTaskResponsible = createSelector(
  taskRoles,
  (roles) => roles?.find(isResponsible)?.assign_user,
);

export const getTaskImplementers = createSelector(taskRoles, (roles) =>
  getUsersFromRoles(roles?.filter(isImplementer)),
);

export const getTaskWatchers = createSelector(taskRoles, (roles) =>
  getUsersFromRoles(roles?.filter(isWatcher)),
);

export const getTaskWatchersID = createSelector(taskRoles, (roles) =>
  getUsersIdFromRoles(roles?.filter(isWatcher)),
);

export const getTaskImplementersID = createSelector(taskRoles, (roles) =>
  getUsersIdFromRoles(roles?.filter(isImplementer)),
);

export const getTaskResponsibleID = createSelector(
  taskRoles,
  (roles) => roles?.find(isResponsible)?.assign_user.user_id,
);

export const getTaskAuthorID = createSelector(
  taskRoles,
  (roles) => roles?.find(isAuthor)?.assign_user.user_id,
);

export const getEditTaskLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.task;

export const getEditTitleLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.title;

export const getEditDescLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.desc;

export const getEditMembersLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.members;

export const getEditTaskError = (state: RootState) =>
  state.editTask.editTaskReducer.editError.task;

export const getEditStatusLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.status;

export const getCheckList = (state: RootState): ICheckList | null =>
  state.editTask.editTaskReducer.data?.check_lists[0] || null;

export const getCheckListId = (state: RootState): string | undefined =>
  state.editTask.editTaskReducer.data?.check_lists[0]?.check_list_id;

export const getCheckListProgress = createSelector(
  getCheckList,
  (checkList): TProgress => {
    const total = checkList?.items.length;

    if (total) {
      const completed = checkList.items.filter((item) => item.complete).length;
      const percent = Math.round((completed / total) * 100);

      return {
        total,
        completed,
        percent,
      };
    }

    return null;
  },
);

export const getIsCheckListLoading = (state: RootState): boolean =>
  state.editTask.editTaskReducer.editLoading.checkList;

export const getIsCheckListItemLoading = (state: RootState): boolean =>
  state.editTask.editTaskReducer.editLoading.checkListItem;

export const getIsCheckListTitleLoading = (state: RootState): boolean =>
  state.editTask.editTaskReducer.editLoading.checkListTitle;

export const getCheckListTitle = (state: RootState): string =>
  state.editTask.editTaskReducer.data!.check_lists[0].title;
