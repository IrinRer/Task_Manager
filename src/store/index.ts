import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer from 'store/tasks/slice';
import authReducer from 'store/auth/slice';
import validReducer from 'store/validate/slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    valide: validReducer,
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
