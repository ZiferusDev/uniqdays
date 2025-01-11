import { createApi } from '@reduxjs/toolkit/query';
import { baseQuery } from 'shared/api';

export const todosApi = createApi({
  baseQuery,
  reducerPath: 'todosApi',
  endpoints: () => ({}),
});
