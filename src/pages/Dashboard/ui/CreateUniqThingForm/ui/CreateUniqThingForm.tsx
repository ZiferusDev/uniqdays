import { DatePicker, Input, Button, Checkbox } from '~/shared/ui'

import { useCreateUniqThingForm } from '../lib'
import { HelpingPanel } from './HelpingPanel'

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
    dateOfCompleting,
    onChangeDateOfCompleting,
  } = useCreateUniqThingForm()

  return (
    <div className="flex flex-col items-start">
      <HelpingPanel
        isThingDoneByDefault={isThingDoneByDefault}
        toggleIsThingDoneByDefault={toggleIsThingDoneByDefault}
        onResetForm={onResetForm}
      />
      <div className="bg-default-bg-gray rounded-2xl px-5 pb-5 pt-4">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-65 flex flex-col items-start justify-center gap-5"
        >
          <h3 className="font-bold text-xl">Создать новое уникальное действие</h3>
          <div id="inputGroup" className="flex flex-col gap-3">
            <Input id="title" name="title" type="text" placeholder="Название" stretched required />
            <Input id="description" name="description" placeholder="Описание" stretched />
            <Input
              id="yearByDefault"
              name="yearByDefault"
              value={yearByDefault}
              onChange={onChangeYearByDefault}
              type="number"
              label="!временное"
              placeholder="Год по дефолту"
              stretched
            />
            <DatePicker
              id="dateOfCompleting"
              name="dateOfCompleting"
              placeholder="Дата"
              certainYear={yearByDefault || undefined}
              value={dateOfCompleting}
              onChange={onChangeDateOfCompleting}
              stretched
            />
          </div>
          <Checkbox
            id="isDone"
            checked={isThingDone}
            onChange={toggleIsThingDone}
            className="cursor-pointer"
            defaultChecked={isThingDoneByDefault}
            name="isDone"
            label="Завершённое событие"
          />
          <Button type="submit" isLoading={isLoading} stretched>
            Создать
          </Button>
        </form>
      </div>
    </div>
  )
}
