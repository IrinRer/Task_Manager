
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import tasksReducer from './tasks/slice';
import onetaskReducer from './task/slice';
import commonRolesReducer from './common/roles/slice';

import filtersReducer from './filters/slice';
import usersReducer from './users/slice';
import commonTagsReducer from './common/tags/slice';
import commonProgressesReducer from './common/progresses/slice';
import commonPrioritiesReducer from './common/priorities/slice';
import commonStatusesReducer from './common/statuses/slice';

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
// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
