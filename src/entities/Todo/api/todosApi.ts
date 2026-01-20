import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  serverTimestamp,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { baseQuery, db } from '~/shared/api'

import { createApi } from '@reduxjs/toolkit/query/react'

import type { TTask } from '../model'

const tasksCollectionRef = collection(db, 'tasks')

type TTaskCreate = Omit<TTask, 'dateOfCompleting'> & { dateOfCompleting: number }

export const todosApi = createApi({
  baseQuery,
  reducerPath: 'todosApi',
  tagTypes: ['UniqThings'],
  endpoints: (build) => ({
    getTasks: build.query<TTask[], void>({
      queryFn: async () => {
        try {
          const data = await getDocs(query(tasksCollectionRef, orderBy('timestamp', 'desc')))
          const tasksData = data.docs.map((doc) => ({ ...(doc.data() as TTask), id: doc.id }))
          return { data: tasksData }
        } catch (error) {
          return typeof error === 'string'
            ? { error: new Error(error) }
            : { error: new Error('Ошибка при получении действий') }
        }
      },
      providesTags: ['UniqThings'],
    }),
    addTask: build.mutation<TTaskCreate, TTaskCreate>({
      queryFn: async (data) => {
        const tasksCollection = collection(db, 'tasks')
        try {
          const tasksWithSameName = query(tasksCollection, where('title', '==', data.title))
          const snapshot = await getDocs(tasksWithSameName)

          if (!snapshot.empty) {
            throw new Error('title is not unique')
          }

          await addDoc(tasksCollection, {
            ...data,
            timestamp: serverTimestamp(),
          })
          // weird
          return {
            data: {
              ...data,
            },
          }
        } catch (error) {
          if (error) {
            if (typeof error === 'string') return { error: new Error(error) }
            if (
              typeof error === 'object' &&
              'message' in error &&
              typeof error.message === 'string'
            ) {
              return { error: new Error(error.message) }
            }
          }
          return { error: new Error('Ошибка при создании действия') }
        }
      },
      invalidatesTags: ['UniqThings'],
    }),
    deleteTaskById: build.mutation<void, string>({
      queryFn: async (taskId) => {
        const taskDoc = doc(db, 'tasks', taskId)
        try {
          await deleteDoc(taskDoc)
          return { data: undefined }
          // weird
        } catch (error) {
          return typeof error === 'string'
            ? { error: new Error(error) }
            : { error: new Error('Ошибка при удалении действия') }
        }
      },
      invalidatesTags: ['UniqThings'],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskByIdMutation } = todosApi
