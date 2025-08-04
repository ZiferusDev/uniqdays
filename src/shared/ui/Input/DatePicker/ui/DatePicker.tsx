import { Input, TInputProps } from '../../ui';

type TDatePickerProps = Omit<TInputProps, 'type'> & {
  certainYear?: number;
};

export const DatePicker = ({ min, max, certainYear, ...restProps }: TDatePickerProps) => {
  const defaultMin = `${new Date().getFullYear() - 50}-01-01`;
  const defaultMax = `${new Date().getFullYear()}-12-31`;

  let minDate: string | number = defaultMin;
  let maxDate: string | number = defaultMax;

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

  return <Input type="date" min={minDate} max={maxDate} {...restProps} />;
};
