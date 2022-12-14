import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  CombinedState,
} from '@reduxjs/toolkit';
import tasksReducer from 'store/tasks/slice';
import priorityReducer from 'store/editTask/additionalFunctions/priority/slice';
import dateReducer from 'store/editTask/additionalFunctions/date/slice';
import tagReducer from 'store/editTask/additionalFunctions/tag/slice';
import filtersReducer from 'store/filters/slice';
import notificationsReducer from 'store/notifications/slice';
import modalVisibleReducers from 'store/editTask/additionalFunctions/tag/modalVisible/slice';
import tokenReducer from 'store/auth/token/slice';
import verifyReducer from 'store/auth/verify/slice';
import commonRolesReducer from './common/roles/slice';
import usersReducer from './users/slice';
import commonTagsReducer from './common/tags/slice';
import commonProgressesReducer from './common/progresses/slice';
import commonPrioritiesReducer from './common/priorities/slice';
import commonStatusesReducer from './common/statuses/slice';
import onetaskReducer from './common/task/slice';
import editTaskReducer from './editTask/slice';
import historyReducer from './history/slice';
import createTaskReducer from './createTask/slice';
import attachmentsReducer from './editTask/attachments/slice';
import previewReducer from './editTask/attachments/preview/slice';
import addCheckListReducer from './editTask/checkLists/addCheckList/slice';
import deleteCheckListReducer from './editTask/checkLists/deleteCheckList/slice';
import addCheckListItemReducer from './editTask/checkLists/addCheckListItem/slice';
import deleteCheckListItemReducer from './editTask/checkLists/deleteCheckListItem/slice';
import setCheckListTitleReducer from './editTask/checkLists/setCheckListTitle/slice';
import setCompleteCheckListItemReducer from './editTask/checkLists/setCompleteCheckListItem/slice';
import setCheckListItemPositionReducer from './editTask/checkLists/setCheckListItemPosition/slice';
import { IAttachmentsReducer } from './editTask/attachments/types';

import { ICommonTagsReducer } from './common/tags/types';
import { ICommonProgressesReducer } from './common/progresses/types';
import { ICommonPrioritiesReducer } from './common/priorities/types';
import { ICommonStatusesReducer } from './common/statuses/types';
import { IFiltersReducer } from './filters/types';
import { IUsersReducer } from './users/types';
import { ITasksReducer } from './tasks/types';
import { IRolesReducer } from './common/roles/types';
import { ITaskReducer } from './common/task/types';
import { IEditTaskReducer } from './editTask/types';
import { IAuthReducer } from './auth/token/types';
import { IVerifyReducer } from './auth/verify/types';
import { ICreateTaskReducer } from './createTask/types';
import { ITagReducer } from './editTask/additionalFunctions/tag/types';
import { IDateReducer } from './editTask/additionalFunctions/date/types';
import { IPriorityReducer } from './editTask/additionalFunctions/priority/types';
import { IAddCheckListReducer } from './editTask/checkLists/addCheckList/types';
import { IDeleteCheckListReducer } from './editTask/checkLists/deleteCheckList/types';
import { IAddCheckListItemReducer } from './editTask/checkLists/addCheckListItem/types';
import { IDeleteCheckListItemReducer } from './editTask/checkLists/deleteCheckListItem/types';
import { ISetCheckListTitleReducer } from './editTask/checkLists/setCheckListTitle/types';
import { ISetCompleteCheckListItemReducer } from './editTask/checkLists/setCompleteCheckListItem/types';
import { INotificationsReducer } from './notifications/types';
import { IPreviewReducer } from './editTask/attachments/preview/types';
import { IModalVisibleReducer } from './editTask/additionalFunctions/tag/modalVisible/types';
import { ISetCheckListItemPositionReducer } from './editTask/checkLists/setCheckListItemPosition/types';
import { IHistoryReducer } from './history/types';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    history: historyReducer,
    editTask: combineReducers({
      editTaskReducer,
      additionalFunctions: combineReducers({
        priority: priorityReducer,
        date: dateReducer,
        tags: combineReducers({
          tagReducer,
          modalVisible: modalVisibleReducers,
        }),
      }),
      attachments: combineReducers({
        attachmentsReducer,
        preview: previewReducer,
      }),
      checkLists: combineReducers({
        addCheckList: addCheckListReducer,
        deleteCheckList: deleteCheckListReducer,
        addCheckListItem: addCheckListItemReducer,
        deleteCheckListItem: deleteCheckListItemReducer,
        setCheckListTitle: setCheckListTitleReducer,
        setCompleteCheckListItem: setCompleteCheckListItemReducer,
        setCheckListItemPosition: setCheckListItemPositionReducer,
      }),
    }),
    users: usersReducer,
    filters: filtersReducer,
    notifications: notificationsReducer,
    auth: combineReducers({
      token: tokenReducer,
      verify: verifyReducer,
    }),
    common: combineReducers({
      onetask: onetaskReducer,
      statuses: commonStatusesReducer,
      priorities: commonPrioritiesReducer,
      progresses: commonProgressesReducer,
      tags: commonTagsReducer,
      roles: commonRolesReducer,
    }),
    createTask: createTaskReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export type RootState = {
  tasks: ITasksReducer;
  history: IHistoryReducer;
  editTask: CombinedState<{
    editTaskReducer: IEditTaskReducer;
    additionalFunctions: CombinedState<{
      priority: IPriorityReducer;
      date: IDateReducer;
      tags: CombinedState<{
        tagReducer: ITagReducer;
        modalVisible: IModalVisibleReducer;
      }>;
    }>;
    attachments: CombinedState<{
      attachmentsReducer: IAttachmentsReducer;
      preview: IPreviewReducer;
    }>;
    checkLists: CombinedState<{
      addCheckList: IAddCheckListReducer;
      deleteCheckList: IDeleteCheckListReducer;
      addCheckListItem: IAddCheckListItemReducer;
      deleteCheckListItem: IDeleteCheckListItemReducer;
      setCheckListTitle: ISetCheckListTitleReducer;
      setCompleteCheckListItem: ISetCompleteCheckListItemReducer;
      setCheckListItemPosition: ISetCheckListItemPositionReducer;
    }>;
  }>;
  users: IUsersReducer;
  filters: IFiltersReducer;
  notifications: INotificationsReducer;
  auth: CombinedState<{
    token: IAuthReducer;
    verify: IVerifyReducer;
  }>;
  common: CombinedState<{
    onetask: ITaskReducer;
    statuses: ICommonStatusesReducer;
    priorities: ICommonPrioritiesReducer;
    progresses: ICommonProgressesReducer;
    tags: ICommonTagsReducer;
    roles: IRolesReducer;
  }>;
  createTask: ICreateTaskReducer;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
