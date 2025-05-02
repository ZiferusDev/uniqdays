import { useGetTasksQuery } from '@entities/Todo';
import { Providers } from './providers';

export const App = () => {
  const { data, isLoading } = useGetTasksQuery();
  console.log(data);
  console.log('isLoading', isLoading);
  return <>Салам</>;
};
