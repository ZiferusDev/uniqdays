import { useGetTasksQuery } from '~/entities/Todo'
import { LogoutBttn } from '~/features/Auth'

import { CreateUniqThingForm } from './CreateUniqThingForm'
import { UniqThingCard } from './UniqThingCard'

export const Dashboard = () => {
  const { data } = useGetTasksQuery()
  return (
    <div className="m-10 flex gap-10">
      <div>
        Dashboard <LogoutBttn />
      </div>
      <CreateUniqThingForm />
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
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
        <ul id="uniqThingsList" className="flex gap-10 flex-wrap">
          {data
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
            : null}
        </ul>
      </div>
    </div>
  )
}
