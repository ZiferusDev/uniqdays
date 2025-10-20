import { Input } from './Input'
import { EmailIcon } from './icons'

interface InputWithEmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: boolean
  success?: boolean
  disabled?: boolean
}

export const InputWithEmail = ({
  hint,
  error,
  success,
  disabled,
  ...props
}: InputWithEmailProps) => (
  <Input
    iconLeft={<EmailIcon />}
    hint={hint}
    error={error}
    success={success}
    disabled={disabled}
    hintType={error ? 'error' : success ? 'success' : 'default'}
    {...props}
  />
)
