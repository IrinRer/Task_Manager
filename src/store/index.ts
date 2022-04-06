import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer from 'store/tasks/slice';
import onetaskReducer from 'store/task/slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    onetask: onetaskReducer,
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
