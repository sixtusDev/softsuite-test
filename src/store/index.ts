import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { commonApi } from './common.api';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
