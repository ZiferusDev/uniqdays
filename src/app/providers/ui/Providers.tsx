import type { PropsWithChildren } from 'react'

import { Provider } from 'react-redux'

import { store } from '../../model'

export const Providers = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>
}
