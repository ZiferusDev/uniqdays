import { useGetTasksQuery } from '@entities/Todo';
import { LogoutBttn } from '@features';
import { CreateUniqThingForm } from './CreateUniqThingForm';
import { UniqThingCard } from './UniqThingCard';

export const Dashboard = () => {
  const { data } = useGetTasksQuery();
  // console.log(data[0].dateOfCompleting);
  return (
    <div className="m-10 flex flex-col gap-1">
      Dashboard <LogoutBttn />
      <CreateUniqThingForm />
      <ul className="flex m-8 gap-10 flex-wrap">
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
  );
};
