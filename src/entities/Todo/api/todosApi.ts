import { createApi } from '@reduxjs/toolkit/query/react';

import { db, baseQuery } from '@shared/api';
import { collection, getDocs } from 'firebase/firestore';
import { TTask } from '../model';

export const todosApi = createApi({
  baseQuery,
  reducerPath: 'todosApi',
  endpoints: (build) => ({
    getTasks: build.query<TTask[], void>({
      queryFn: () => {
        try {
          const tasksCollectionRef = collection(db, 'tasks');
          getDocs(tasksCollectionRef).then((data) => {
            const tasksData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log('tasksData!!', tasksData);
            return { data: tasksData };
          });
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTasksQuery } = todosApi;
