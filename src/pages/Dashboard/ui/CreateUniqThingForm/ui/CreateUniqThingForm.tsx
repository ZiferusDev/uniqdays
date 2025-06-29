import { useAddTaskMutation } from '@entities/Todo/api/todosApi';
import { FormEvent } from 'react';
import { safeFormDataBooleanValue, safeFormDataDateValue, safeFormDataStringValue } from '../lib';

export const CreateUniqThingForm = () => {
  const [addTask, result] = useAddTaskMutation();

  const onCreateUniqThing = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addTask({
      id: 'auto',
      title: safeFormDataStringValue(formData, 'title'),
      dateOfCompleting: safeFormDataDateValue(formData, 'dateOfCompleting'),
      description: safeFormDataStringValue(formData, 'description'),
      done: safeFormDataBooleanValue(formData, 'isDone'),
    });
  };

  return (
    <form
      onSubmit={onCreateUniqThing}
      className="max-w-90 flex flex-col items-center justify-center-safe bg-amber-200 rounded-2xl p-4 gap-2"
    >
      <input id="title" name="title" type="text" placeholder="Название действия" />
      <input id="description" name="description" placeholder="Описание действия" />
      <input
        id="dateOfCompleting"
        name="dateOfCompleting"
        placeholder="Дата завершения"
        type="date"
      />
      <label className="flex gap-1 select-none cursor-pointer">
        <span>Завершена</span>
        <input id="isDone" name="isDone" type="checkbox" />
      </label>
      <button className="bg-amber-600 rounded-3xl w-40" type="submit">
        Отправить
      </button>
    </form>
  );
};
