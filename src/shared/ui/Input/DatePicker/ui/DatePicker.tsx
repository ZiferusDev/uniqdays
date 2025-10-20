import { useState, useRef } from 'react'

import { IconCalendar } from '@shared/ui/Icons'

import type { IInputProps } from '../../ui'
import { Input } from '../../ui'

type TDatePickerProps = Omit<IInputProps, 'type'> & {
  certainYear?: number
}

export const DatePicker = ({
  min,
  max,
  certainYear,
  placeholder = 'Дата',
  ...restProps
}: TDatePickerProps) => {
  const [inputType, setInputType] = useState<'text' | 'date'>('text')
  const inputRef = useRef<HTMLInputElement>(null)

  const defaultMin = `${new Date().getFullYear() - 50}-01-01`
  const defaultMax = `${new Date().getFullYear()}-12-31`

  let minDate: string | number = defaultMin
  let maxDate: string | number = defaultMax

  if (certainYear) {
    minDate = `${certainYear}-01-01`
    maxDate = `${certainYear}-12-31`
  } else if (min || max) {
    if (min) {
      if (min === 'today') {
        minDate = new Date().toISOString().split('T')[0]
      } else {
        minDate = min
      }
    }
    if (max) {
      if (max === 'today') {
        maxDate = new Date().toISOString().split('T')[0]
      } else {
        maxDate = max
      }
    }
  }

  const handleFocus = () => {
    setInputType('date')
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 0)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setInputType('text')
    }
  }

  return (
    <Input
      ref={inputRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type={inputType}
      min={minDate}
      max={maxDate}
      placeholder={inputType === 'text' ? placeholder : undefined}
      iconRight={inputType === 'text' ? <IconCalendar /> : undefined}
      {...restProps}
    />
  )
}
