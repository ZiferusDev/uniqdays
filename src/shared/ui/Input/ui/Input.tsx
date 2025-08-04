import { InputHTMLAttributes } from 'react';

type TInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  labelText?: string;
  stretched?: boolean;
};

export const Input = ({ id, labelText, stretched = false, ...restProps }: TInputProps) => {
  const stretchedClass = stretched ? 'w-full' : '';
  const inputClass = `pl-1.5 border-2 border-gray-500 rounded-md outline-0 cursor-text ${stretchedClass}`;
  return labelText ? (
    <label htmlFor={id} className={`flex flex-col ${stretchedClass}`}>
      <span className="mb-1 text-sm text-gray-500">{labelText}</span>
      <input id={id} className={inputClass} {...restProps} />
    </label>
  ) : (
    <input id={id} className={inputClass} {...restProps} />
  );
};
