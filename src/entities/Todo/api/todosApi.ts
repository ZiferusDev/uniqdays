import { createApi } from '@reduxjs/toolkit/query/react';

import { db, baseQuery } from '@shared/api';
import { addDoc, collection, getDocs, deleteDoc, serverTimestamp, doc } from 'firebase/firestore';
import { TTask } from '../model';

const tasksCollectionRef = collection(db, 'tasks');

type TTaskCreate = Omit<TTask, 'dateOfCompleting'> & { dateOfCompleting: number };

export const todosApi = createApi({
  baseQuery,
  reducerPath: 'todosApi',
  tagTypes: ['UniqThings'],
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
      providesTags: ['UniqThings'],
    }),
    addTask: build.mutation<TTaskCreate, TTaskCreate>({
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
      invalidatesTags: ['UniqThings'],
    }),
    deleteTaskById: build.mutation<void, string>({
      queryFn: async (taskId) => {
        const taskDoc = doc(db, 'tasks', taskId);
        try {
          await deleteDoc(taskDoc);
          return { data: undefined };
          // weird
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['UniqThings'],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskByIdMutation } = todosApi;
