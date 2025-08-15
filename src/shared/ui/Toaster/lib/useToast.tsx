import { toast, type ToastOptions } from 'react-toastify'

type TToastType = 'info' | 'success' | 'warning' | 'error' | 'default'

type TUseToastProps = {
  type: TToastType
  title: string
  description?: string
}

type TToastBodyProps = Required<Pick<TUseToastProps, 'title' | 'description'>>

const toastDefaultStyle: ToastOptions = {
  position: 'bottom-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'dark',
}

const ToastBody = ({ title, description }: TToastBodyProps) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold">{title}</div>
      <div>{description}</div>
    </div>
  )
}

export const useToast = () => ({
  showToast: ({ type, title, description }: TUseToastProps) => {
    switch (type) {
      case 'info':
        toast.info(
          description ? <ToastBody title={title} description={description} /> : title,
          toastDefaultStyle
        )
        break
      case 'success':
        toast.success(
          description ? <ToastBody title={title} description={description} /> : title,
          toastDefaultStyle
        )
        break
      case 'warning':
        toast.warning(
          description ? <ToastBody title={title} description={description} /> : title,
          toastDefaultStyle
        )
        break
      case 'error':
        toast.error(
          description ? <ToastBody title={title} description={description} /> : title,
          toastDefaultStyle
        )
        break
      default:
        toast(
          description ? <ToastBody title={title} description={description} /> : title,
          toastDefaultStyle
        )
        break
    }
  },
})
