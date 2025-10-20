import type { TToastBodyProps } from '../model'

export const ToastBody = ({ title, description }: TToastBodyProps) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold">{title}</div>
      <div>{description}</div>
    </div>
  )
}
