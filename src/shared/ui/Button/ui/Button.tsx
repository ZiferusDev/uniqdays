import { Spinner } from '~/shared/ui'

type TButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  isLoading?: boolean
  stretched?: boolean
}

export const Button = ({ children, isLoading = false, stretched, ...props }: TButtonProps) => {
  const stretchedClass = stretched ? 'w-full' : ''

  return (
    <button
      className={`
        bg-button-primary 
        border-button-primary 
        rounded-md 
        inline-flex 
        items-center 
        justify-center 
        py-3 
        px-7 
        text-center 
        text-base 
        font-medium 
        text-button-text 
        hover:bg-button-primary-hover 
        hover:border-button-primary-hover 
        disabled:bg-button-disabled-bg 
        disabled:border-button-disabled-border 
        disabled:text-button-disabled-text 
        active:bg-button-primary-hover 
        active:border-button-primary-hover 
        disabled:opacity-60 
        disabled:cursor-not-allowed 
        transition-colors 
        duration-200
        ${stretchedClass}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="s" /> : children}
    </button>
  )
}
