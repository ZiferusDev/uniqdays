import { useAddTaskMutation } from '@entities';
import { useToast } from '@shared';
import { useState, useRef, FormEvent, useEffect, ChangeEvent } from 'react';
import {
  safeFormDataDateValue,
  safeFormDataStringValue,
  safeFormDataCheckboxValue,
} from './transformers';

export const useCreateUniqThingForm = () => {
  const [addTask, { isError, isSuccess, isLoading, error }] = useAddTaskMutation();
  const [isThingDoneByDefault, setIsThingDoneByDefault] = useState(false);
  const [isThingDone, setIsThingDone] = useState(isThingDoneByDefault);
  const [dateOfCompleting, setDateOfCompleting] = useState<string>('');
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

  const onChangeDateOfCompleting = (e: ChangeEvent<HTMLInputElement>) => {
    setDateOfCompleting(e.target.value);
  };

  const onChangeYearByDefault = (e: ChangeEvent<HTMLInputElement>) => {
    setYearByDefault(Number(e.target.value));
    setDateOfCompleting('');
  };

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

      setDateOfCompleting('');
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    onCreateUniqThing(e);
  };

  useEffect(() => {
    if (yearByDefault === 0) {
      setYearByDefault('');
    }
  }, [yearByDefault]);

  useEffect(() => {
    if (isError) {
      const isUniqueError = error.message?.match('not unique');
      showToast({
        type: 'error',
        title: 'Возникла ошибка',
        description: isUniqueError ? 'Такое уникальное действие уже существует' : undefined,
      });
    } else if (isSuccess) {
      showToast({
        type: 'success',
        title: 'Создано уникальное действие',
      });
      onResetForm();
    }
  }, [isError, isSuccess]);

  return {
    formRef,
    isLoading,
    isThingDoneByDefault,
    isThingDone,
    toggleIsThingDone,
    toggleIsThingDoneByDefault,
    dateOfCompleting,
    onChangeDateOfCompleting,
    onSubmit,
    onIsThingDone,
    onIsThingNotDone,
    onResetForm,
    yearByDefault,
    onChangeYearByDefault,
  };
};
