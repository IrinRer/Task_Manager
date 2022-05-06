import {
  Action,
  CombinedState,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import tasksReducer from 'store/tasks/slice';
import filtersReducer from 'store/filters/slice';
import tokenReducer from 'store/auth/token/slice';
import verifyReducer from 'store/auth/verify/slice';
import usersReducer from './users/slice';
import commonTagsReducer from './common/tags/slice';
import commonProgressesReducer from './common/progresses/slice';
import commonPrioritiesReducer from './common/priorities/slice';
import commonStatusesReducer from './common/statuses/slice';
import { ITasksReducer } from './tasks/types';
import { IUsersReducer } from './users/types';
import { IFiltersReducer } from './filters/types';
import { ICommonStatusesReducer } from './common/statuses/types';
import { ICommonPrioritiesReducer } from './common/priorities/types';
import { ICommonProgressesReducer } from './common/progresses/types';
import { ICommonTagsReducer } from './common/tags/types';
import { IAuthReducer } from './auth/token/types';
import { IVerifyReducer } from './auth/verify/types';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    filters: filtersReducer,
    auth: combineReducers({
      token: tokenReducer,
      verify: verifyReducer,
    }),
    common: combineReducers({
      statuses: commonStatusesReducer,
      priorities: commonPrioritiesReducer,
      progresses: commonProgressesReducer,
      tags: commonTagsReducer,
    }),
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export type RootState = {
  tasks: ITasksReducer;
  users: IUsersReducer;
  filters: IFiltersReducer;
  auth: CombinedState<{
    token: IAuthReducer;
    verify: IVerifyReducer;
  }>;
  common: CombinedState<{
    statuses: ICommonStatusesReducer;
    priorities: ICommonPrioritiesReducer;
    progresses: ICommonProgressesReducer;
    tags: ICommonTagsReducer;
  }>;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
