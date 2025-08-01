import { Popover, Tooltip, useToast } from '@shared';
import { TagBlock } from './TagBlock';
import { useEffect, useState } from 'react';
import { useDeleteTaskByIdMutation } from '@entities';

type TUniqThingCardProps = {
  id: string;
  name: string;
  description?: string;
  isDone?: boolean;
  dateOfCompleting?: number;
  tags?: string[];
};

export const UniqThingCard = ({
  id,
  name,
  description,
  isDone = false,
  dateOfCompleting,
  tags,
}: TUniqThingCardProps) => {
  const [isDeleteThingPopoverOpened, setIsDeleteThingPopoverOpened] = useState(false);

  console.log(dateOfCompleting);

  const [deleteTaskById, { isSuccess, isError }] = useDeleteTaskByIdMutation();

  const { showToast } = useToast();

  const onOpenDeleteThingPopover = () => setIsDeleteThingPopoverOpened(true);
  const onCloseDeleteThingPopover = () => setIsDeleteThingPopoverOpened(false);

  const onDeleteThing = async () => {
    onCloseDeleteThingPopover();
    await deleteTaskById(id);
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
        title: 'Удалено событие',
        description: name,
      });
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col border-2 border-gray-300 rounded-2xl p-5 w-2xs relative">
      <div className="absolute top-3 right-3 z-10">
        <Popover
          opened={isDeleteThingPopoverOpened}
          setOpened={setIsDeleteThingPopoverOpened}
          content={
            <div className="w-full flex flex-col items-center gap-4">
              <div className="text-xl font-semibold">Удалить событие?</div>
              <div className="flex gap-4">
                <button
                  onClick={onCloseDeleteThingPopover}
                  className="bg-gray-500 rounded-2xl w-fit px-3 py-1 cursor-pointer hover:bg-gray-600"
                >
                  Отмена
                </button>
                <button
                  onClick={onDeleteThing}
                  className="bg-red-800 rounded-2xl w-fit px-3 py-1 cursor-pointer hover:bg-red-900"
                >
                  Удалить
                </button>
              </div>
            </div>
          }
        >
          <button
            id="deleteUniqThingBttn"
            className="cursor-pointer opacity-80 hover:opacity-100"
            onClick={onOpenDeleteThingPopover}
          >
            ❌
          </button>
        </Popover>
      </div>
      <div className="flex-1 min-w-0 pr-8">
        <Tooltip text={name}>
          <div className="font-bold truncate italic">{name}</div>
        </Tooltip>
      </div>
      {isDone ? (
        <>
          <span className="text-emerald-600 font-bold">✅ Готово</span>
          <span className="flex gap-2">
            <span className="font-bold">День: </span>
            {dateOfCompleting ? (
              new Date(dateOfCompleting).toLocaleDateString()
            ) : (
              <input
                id="dateOfCompleting"
                name="dateOfCompleting"
                placeholder="Дата завершения"
                type="date"
                className="max-w-28 text-lg cursor-text"
              />
            )}
          </span>
        </>
      ) : (
        <span className="text-amber-500 font-bold">🕒 Ожидает</span>
      )}
      {description ? `Описание: ${description}` : ''}
      {tags?.map((tag) => (
        <TagBlock key={tag}>{tag}</TagBlock>
      ))}
    </div>
  );
};
