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
    getTasks: build.query<TTask[], string | void>({
      queryFn: async (searchQuery) => {
        try {
          // Если есть поисковый запрос
          if (searchQuery && searchQuery.trim() !== '') {
            const searchTerm = searchQuery.toLowerCase().trim()

            // Создаём запросы для поиска
            const titleQuery = query(
              tasksCollectionRef,
              where('title', '>=', searchTerm),
              where('title', '<=', searchTerm + '\uf8ff'),
              orderBy('timestamp', 'desc')
            )

            const descriptionQuery = query(
              tasksCollectionRef,
              where('description', '>=', searchTerm),
              where('description', '<=', searchTerm + '\uf8ff'),
              orderBy('timestamp', 'desc')
            )

            // Выполняем оба запроса параллельно
            const [titleSnapshot, descriptionSnapshot] = await Promise.all([
              getDocs(titleQuery),
              getDocs(descriptionQuery),
            ])

            // Объединяем результаты, используя Map для уникальности
            const tasksMap = new Map<string, TTask>()

            titleSnapshot.forEach((doc) => {
              tasksMap.set(doc.id, {
                ...doc.data(),
                id: doc.id,
              } as TTask)
            })

            descriptionSnapshot.forEach((doc) => {
              if (!tasksMap.has(doc.id)) {
                tasksMap.set(doc.id, {
                  ...doc.data(),
                  id: doc.id,
                } as TTask)
              }
            })

            const filteredTasks = Array.from(tasksMap.values())
            return { data: filteredTasks }
          }

          // Если нет поискового запроса - возвращаем все задачи
          const allTasksQuery = query(tasksCollectionRef, orderBy('timestamp', 'desc'))
          const snapshot = await getDocs(allTasksQuery)
          const tasks = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as TTask[]

          return { data: tasks }
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
