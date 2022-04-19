import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import tasksReducer from 'store/tasks/slice';
import onetaskReducer from 'store/task/slice';
import membersReducer from 'store/members/slice';
import commonStatusesReducer from 'store/common/statuses/slice';
import commonRolesReducer from 'store/common/roles/slice';


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    onetask: onetaskReducer,
    members: membersReducer,
    common: combineReducers({
      statuses: commonStatusesReducer,
      roles: commonRolesReducer,
    }),
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
