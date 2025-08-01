import { useAddTaskMutation } from '@entities';
import { FormEvent, useEffect } from 'react';
import { safeFormDataCheckboxValue, safeFormDataDateValue, safeFormDataStringValue } from '../lib';
import { useToast } from '@shared';

export const CreateUniqThingForm = () => {
  const [addTask, { isError, isSuccess }] = useAddTaskMutation();

  const { showToast } = useToast();

  const onCreateUniqThing = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const taskTitle = formData.get('title');

    if (typeof taskTitle === 'string') {
      await addTask({
        id: 'auto',
        title: taskTitle,
        dateOfCompleting: safeFormDataDateValue(formData, 'dateOfCompleting'),
        description: safeFormDataStringValue(formData, 'description'),
        done: safeFormDataCheckboxValue(formData, 'isDone'),
      });
    }
  };

  useEffect(() => {
    if (isError) {
      showToast({
        type: 'error',
        title: 'Возникла ошибка',
      });
    } else if (isSuccess) {
      showToast({
        type: 'success',
        title: 'Создано уникальное действие',
      });
    }
  }, [isError, isSuccess]);

  return (
    <form
      onSubmit={onCreateUniqThing}
      className="max-w-90 flex flex-col items-center justify-center-safe bg-amber-200 rounded-2xl p-4 gap-2"
    >
      <input id="title" name="title" type="text" placeholder="Название действия" required />
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
      <button
        className="bg-amber-500 rounded-3xl w-40 cursor-pointer hover:bg-amber-600"
        type="submit"
      >
        Отправить
      </button>
    </form>
  );
};
