export type TToastType = 'info' | 'success' | 'warning' | 'error' | 'default'

export type TUseToastProps = {
  type: TToastType
  title: string
  description?: string
}

export type TToastBodyProps = Required<Pick<TUseToastProps, 'title' | 'description'>>
