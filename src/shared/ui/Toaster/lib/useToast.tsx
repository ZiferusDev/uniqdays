import { useCallback } from 'react'

import { toast, type ToastOptions } from 'react-toastify'

import type { TUseToastProps } from '../model'
import { ToastBody } from '../ui'

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

export const useToast = () => {
  const showToast = useCallback(({ type, title, description }: TUseToastProps) => {
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
  }, [])
  return {
    showToast,
  }
}
