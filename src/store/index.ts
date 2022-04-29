import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  CombinedState,
} from '@reduxjs/toolkit';

import tasksReducer from './tasks/slice';
import onetaskReducer from './task/slice';
import commonRolesReducer from './common/roles/slice';

import filtersReducer from './filters/slice';
import usersReducer from './users/slice';
import commonTagsReducer from './common/tags/slice';
import commonProgressesReducer from './common/progresses/slice';
import commonPrioritiesReducer from './common/priorities/slice';
import commonStatusesReducer from './common/statuses/slice';
import { ICommonTagsReducer } from './common/tags/types';
import { ICommonProgressesReducer } from './common/progresses/types';
import { ICommonPrioritiesReducer } from './common/priorities/types';
import { ICommonStatusesReducer } from './common/statuses/types';
import { IFiltersReducer } from './filters/types';
import { IUsersReducer } from './users/types';
import { ITasksReducer } from './tasks/types';
import { ITaskReducer } from './task/types';
import { IRolesReducer } from './common/roles/types';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    onetask: onetaskReducer,
    users: usersReducer,
    filters: filtersReducer,
    common: combineReducers({
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
  onetask: ITaskReducer;
  users: IUsersReducer;
  filters: IFiltersReducer;
  common: CombinedState<{
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
