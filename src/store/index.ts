import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import tasksReducer from 'store/tasks/slice';
import tokenReducer from 'store/auth/token/slice';
import verifyReducer from 'store/auth/verify/slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: combineReducers({
      token: tokenReducer,
      verify: verifyReducer,
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
