import { createApi } from '@reduxjs/toolkit/query/react';

import { db, baseQuery } from '@shared/api';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { TTask } from '../model';

const tasksCollectionRef = collection(db, 'tasks');

export const todosApi = createApi({
  baseQuery,
  reducerPath: 'todosApi',
  endpoints: (build) => ({
    getTasks: build.query<TTask[], void>({
      queryFn: async () => {
        try {
          const data = await getDocs(tasksCollectionRef);
          const tasksData = data.docs.map((doc) => ({ ...(doc.data() as TTask), id: doc.id }));
          return { data: tasksData };
        } catch (error) {
          return { error };
        }
      },
    }),
    addTask: build.mutation<TTask, TTask>({
      queryFn: async (data) => {
        try {
          await addDoc(collection(db, 'tasks'), {
            ...data,
            timestamp: serverTimestamp(),
          });
          // weird
          return {
            data: {
              ...data,
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = todosApi;
