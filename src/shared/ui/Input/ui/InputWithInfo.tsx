import { Input } from './Input'
import { InfoIcon, SuccessIcon } from './icons'

interface InputWithInfoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: boolean
  success?: boolean
  disabled?: boolean
  iconPosition?: 'left' | 'right'
}

export const InputWithInfo = ({
  hint,
  error,
  success,
  disabled,
  iconPosition = 'right',
  ...props
}: InputWithInfoProps) => (
  <Input
    iconLeft={iconPosition === 'left' ? <InfoIcon /> : undefined}
    iconRight={iconPosition === 'right' ? success ? <SuccessIcon /> : <InfoIcon /> : undefined}
    hint={hint}
    error={error}
    success={success}
    disabled={disabled}
    hintType={error ? 'error' : success ? 'success' : 'default'}
    {...props}
  />
)
