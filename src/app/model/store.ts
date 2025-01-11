import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosApi } from 'entities/Todo/api/todosApi';

const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
