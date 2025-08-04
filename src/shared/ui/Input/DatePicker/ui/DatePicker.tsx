import { Input } from '../../ui';

type TDatePickerProps = {
  id?: string;
  name?: string;
  labelText?: string;
  min?: string;
  max?: string;
  certainYear?: number;
};

export const DatePicker = ({ id, name, labelText, min, max, certainYear }: TDatePickerProps) => {
  const defaultMin = `${new Date().getFullYear() - 50}-01-01`;
  const defaultMax = `${new Date().getFullYear()}-12-31`;

  let minDate = defaultMin;
  let maxDate = defaultMax;

  if (certainYear) {
    minDate = `${certainYear}-01-01`;
    maxDate = `${certainYear}-12-31`;
  } else if (min || max) {
    if (min) {
      if (min === 'today') {
        minDate = new Date().toISOString().split('T')[0];
      } else {
        minDate = min;
      }
    }
    if (max) {
      if (max === 'today') {
        maxDate = new Date().toISOString().split('T')[0];
      } else {
        maxDate = max;
      }
    }
  }

  return (
    <Input
      id={id}
      name={name}
      labelText={labelText}
      type="date"
      stretched
      min={minDate}
      max={maxDate}
    />
  );
};
