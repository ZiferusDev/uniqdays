import { useContext } from 'react'

import { GlobalSearchContext } from '../model'

export const useGlobalSearch = () => {
  const context = useContext(GlobalSearchContext)
  if (!context) {
    throw new Error('useGlobalSearch must be used within GlobalSearchProvider')
  }
  return context
}
