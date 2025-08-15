import { Spinner } from '@shared/ui/Spinner'

type TButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  isLoading?: boolean
}

export const Button = ({ children, isLoading = false, ...props }: TButtonProps) => {
  return (
    <button
      className={`bg-yellow-400 rounded-3xl w-40 cursor-pointer enabled:hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="s" /> : children}
    </button>
  )
}
