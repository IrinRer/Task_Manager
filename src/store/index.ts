import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  CombinedState,
} from '@reduxjs/toolkit';

import tasksReducer from './tasks/slice';
import filtersReducer from './filters/slice';
import tokenReducer from './auth/token/slice';
import verifyReducer from './auth/verify/slice';
import commonRolesReducer from './common/roles/slice';
import usersReducer from './users/slice';
import commonTagsReducer from './common/tags/slice';
import commonProgressesReducer from './common/progresses/slice';
import commonPrioritiesReducer from './common/priorities/slice';
import commonStatusesReducer from './common/statuses/slice';
import onetaskReducer from './common/task/slice';
import editTaskReducer from './editTask/slice';

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

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    editTask: editTaskReducer,
    users: usersReducer,
    filters: filtersReducer,
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
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export type RootState = {
  tasks: ITasksReducer;
  editTask: IEditTaskReducer;
  users: IUsersReducer;
  filters: IFiltersReducer;
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
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;