import type { InputHTMLAttributes, ReactNode, RefObject } from 'react'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: boolean
  success?: boolean
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  stretched?: boolean
  hintType?: 'default' | 'error' | 'success'
  ref?: RefObject<HTMLInputElement>
}

export const Input = ({
  id,
  label,
  hint,
  error = false,
  success = false,
  disabled = false,
  iconLeft,
  iconRight,
  hintType = 'default',
  className = '',
  stretched = false,
  ...restProps
}: IInputProps) => {
  const baseClasses =
    'w-full rounded-lg bg-transparent py-3 text-dark placeholder-dark-6 outline-hidden dark:text-white dark:placeholder-dark-5'

  let stateClasses = ''
  if (error) {
    stateClasses = 'border-red'
  } else if (success) {
    stateClasses = 'border-green'
  } else if (disabled) {
    stateClasses = 'border-gray-2 bg-gray-2 text-dark-6 dark:border-dark-3 dark:bg-dark-3'
  } else {
    stateClasses =
      'border-stroke focus:border-primary dark:border-dark-3 bg-white border-2 border-border-gray'
  }

  const hintClasses = {
    default: 'text-dark-5',
    error: 'text-red',
    success: 'text-green',
  }

  const stretchedClass = stretched ? 'w-full' : ''
  return (
    <div id={id} className={stretchedClass}>
      {label && (
        <label
          className={`mb-2.5 block text-base font-medium text-dark dark:text-white ${stretchedClass}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
            {iconLeft}
          </span>
        )}

        <input
          className={`${baseClasses} ${stateClasses} ${
            iconLeft ? 'pl-12' : 'pl-5'
          } ${iconRight ? 'pr-12' : 'pr-5'} ${className}`}
          disabled={disabled}
          {...restProps}
        />

        {iconRight && (
          <span
            className={`absolute right-0 top-0 flex h-full w-12 items-center justify-center ${
              error ? 'text-red' : success ? 'text-green' : 'text-dark-5'
            }`}
          >
            {iconRight}
          </span>
        )}
      </div>

      {hint && <p className={`pt-1 text-sm ${hintClasses[hintType]}`}>{hint}</p>}
    </div>
  )
}
