import { DatePicker, Input, Button } from '@shared';
import { HelpingPanel } from './HelpingPanel';
import { useCreateUniqThingForm } from '../lib';

export const CreateUniqThingForm = () => {
  const {
    isThingDoneByDefault,
    toggleIsThingDoneByDefault,
    formRef,
    onSubmit,
    isLoading,
    isThingDone,
    toggleIsThingDone,
    onResetForm,
    yearByDefault,
    onChangeYearByDefault,
  } = useCreateUniqThingForm();

  return (
    <div className="flex flex-col items-start">
      <HelpingPanel
        isThingDoneByDefault={isThingDoneByDefault}
        toggleIsThingDoneByDefault={toggleIsThingDoneByDefault}
        onResetForm={onResetForm}
      />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="max-w-70 flex flex-col items-center justify-center bg-indigo-100 rounded-2xl p-8 gap-2"
      >
        <h3 className="font-bold">Создать уникальное действие</h3>
        <Input
          id="title"
          name="title"
          type="text"
          labelText="Название"
          placeholder="Название действия"
          stretched
          required
        />
        <Input
          id="description"
          name="description"
          labelText="Описание"
          placeholder="Описание действия"
          stretched
        />
        <Input
          labelText="Год по дефолту"
          value={yearByDefault}
          onChange={onChangeYearByDefault}
          type="number"
          stretched
        />
        <DatePicker
          id="dateOfCompleting"
          name="dateOfCompleting"
          labelText="Дата завершения"
          certainYear={yearByDefault || undefined}
        />
        <label className="flex gap-1 select-none cursor-pointer items-center justify-center">
          <input
            id="isDone"
            checked={isThingDone}
            onChange={toggleIsThingDone}
            className="cursor-pointer"
            defaultChecked={isThingDoneByDefault}
            name="isDone"
            type="checkbox"
          />
          <span>Завершена</span>
        </label>
        <Button type="submit" isLoading={isLoading}>
          Отправить
        </Button>
      </form>
    </div>
  );
};
