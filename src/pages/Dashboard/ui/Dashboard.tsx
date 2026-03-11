import { useGetTasksQuery } from '~/entities/Todo'
import { LogoutBttn } from '~/features/Auth'

import { CreateUniqThingForm } from './CreateUniqThingForm'
import { GlobalSearch } from './GlobalSearch'
import { useGlobalSearch } from './GlobalSearchContext'
import { UniqThingCard } from './UniqThingCard'

export const Dashboard = () => {
  const { activeSearchQuery } = useGlobalSearch()

  const { data, isLoading } = useGetTasksQuery(activeSearchQuery || undefined)

  return (
    <div className="m-10 flex gap-10">
      <div>
        Dashboard <LogoutBttn />
      </div>
      <CreateUniqThingForm />
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <GlobalSearch />
          <span className="text-red">Хочу здесь выбор сортировки</span>
          <div className="flex gap-3">
            <select title="asdsda" className="w-48 border-2 border-emerald-300">
              <option>По Названию</option>
              <option>По дате выполнения</option>
              <option>По дате создания</option>
            </select>
            <select title="asdsda" className="w-48 border-2 border-blue-400">
              <option>По убыванию</option>
              <option>По возрастанию</option>
            </select>
          </div>
        </label>

        {/* Индикатор загрузки */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
          </div>
        )}

        {/* Список задач */}
        <ul id="uniqThingsList" className="flex gap-10 flex-wrap">
          {data && data.length > 0
            ? data.map((task) => (
                <li key={task.id}>
                  <UniqThingCard
                    id={task.id}
                    name={task.title}
                    isDone={task.done}
                    description={task.description}
                    dateOfCompleting={task.dateOfCompleting}
                  />
                </li>
              ))
            : !isLoading && (
                <li className="text-gray-500 text-center w-full py-8">
                  {activeSearchQuery ? 'Ничего не найдено по вашему запросу' : 'Нет задач'}
                </li>
              )}
        </ul>
      </div>
    </div>
  )
}
