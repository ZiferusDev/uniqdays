import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosApi } from '@entities/Todo';

const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
  devTools: true,
});
