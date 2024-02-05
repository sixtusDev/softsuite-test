import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './slices/counter.slice';
import elementReducer from './slices/element.slice';
import userReducer from './slices/user.slice';
import { commonApi } from './common.api';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    counter: counterReducer,
    users: userReducer,
    elements: elementReducer,
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
