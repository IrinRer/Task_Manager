import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer from 'store/tasks/slice';
import authReducer from 'store/auth/slice';
import verifyReducer from 'store/verify/slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    verify: verifyReducer,
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
