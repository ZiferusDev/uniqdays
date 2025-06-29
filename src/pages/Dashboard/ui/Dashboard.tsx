import { TodoCard, useGetTasksQuery } from '@entities/Todo';
import { LogoutBttn } from '@features';
import { CreateUniqThingForm } from './CreateUniqThingForm';

export const Dashboard = () => {
  const { data, isLoading } = useGetTasksQuery();
  console.log('dash_data', data);

  return (
    <div className="m-10 flex flex-col gap-1">
      Dashboard <LogoutBttn />
      <CreateUniqThingForm />
      <ul className="m-8">
        {data
          ? data.map((task) => (
              <li key={task.id}>
                <TodoCard>{task.title}</TodoCard>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
