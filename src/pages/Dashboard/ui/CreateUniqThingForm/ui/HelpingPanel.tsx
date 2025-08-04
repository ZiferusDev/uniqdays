type THelpingPanelProps = {
  isThingDoneByDefault: boolean;
  toggleIsThingDoneByDefault: () => void;
  onResetForm: () => void;
};

export const HelpingPanel = ({
  isThingDoneByDefault,
  toggleIsThingDoneByDefault,
  onResetForm,
}: THelpingPanelProps) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label className="flex gap-1 select-none cursor-pointer items-center justify-center text-sm">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={isThingDoneByDefault}
          onChange={toggleIsThingDoneByDefault}
        />
        <span>Я ввожу завершённые действия</span>
      </label>
      <button
        className="text-red-500 font-semibold cursor-pointer hover:text-red-300"
        onClick={onResetForm}
      >
        Очистить
      </button>
    </div>
  );
};
