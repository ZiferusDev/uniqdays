import { useAddTaskMutation } from '@entities';
import { useToast } from '@shared';
import { useState, useRef, FormEvent, useEffect, ChangeEvent } from 'react';
import {
  safeFormDataDateValue,
  safeFormDataStringValue,
  safeFormDataCheckboxValue,
} from './transformers';

export const useCreateUniqThingForm = () => {
  const [addTask, { isError, isSuccess, isLoading }] = useAddTaskMutation();
  const [isThingDoneByDefault, setIsThingDoneByDefault] = useState(false);
  const [isThingDone, setIsThingDone] = useState(isThingDoneByDefault);
  const [yearByDefault, setYearByDefault] = useState<number | ''>();

  const formRef = useRef<HTMLFormElement>(null);

  const { showToast } = useToast();

  const toggleIsThingDone = () => setIsThingDone((prev) => !prev);
  const toggleIsThingDoneByDefault = () =>
    setIsThingDoneByDefault((prev) => {
      setIsThingDone(!prev);
      return !prev;
    });

  const onIsThingDone = () => setIsThingDone(true);
  const onIsThingNotDone = () => setIsThingDone(false);

  const onChangeYearByDefault = (e: ChangeEvent<HTMLInputElement>) =>
    setYearByDefault(Number(e.target.value));

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

  const onResetForm = () => {
    if (formRef.current) {
      const shouldBeChecked = isThingDoneByDefault;

      formRef.current.reset();

      if (formRef.current.elements.namedItem('isDone')) {
        (formRef.current.elements.namedItem('isDone') as HTMLInputElement).checked =
          shouldBeChecked;
      }

      if (!shouldBeChecked) {
        onIsThingNotDone();
      } else {
        onIsThingDone();
      }
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    onCreateUniqThing(e).then(() => onResetForm());
  };

  useEffect(() => {
    if (yearByDefault === 0) {
      setYearByDefault('');
    }
  }, [yearByDefault]);

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

  return {
    formRef,
    isLoading,
    isThingDoneByDefault,
    isThingDone,
    toggleIsThingDone,
    toggleIsThingDoneByDefault,
    onSubmit,
    onIsThingDone,
    onIsThingNotDone,
    onResetForm,
    yearByDefault,
    onChangeYearByDefault,
  };
};
