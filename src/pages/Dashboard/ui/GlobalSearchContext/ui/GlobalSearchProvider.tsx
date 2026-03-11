import type { ReactNode } from 'react'
import { useState } from 'react'

import { GlobalSearchContext } from '../model'

export const GlobalSearchProvider = ({ children }: { children: ReactNode }) => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [titleInputValue, setTitleInputValue] = useState('')

  // Активный поисковый запрос: titleInputValue приоритетнее, если не пустой
  const activeSearchQuery = titleInputValue.trim() || globalSearchQuery

  return (
    <GlobalSearchContext.Provider
      value={{
        globalSearchQuery,
        setGlobalSearchQuery,
        titleInputValue,
        setTitleInputValue,
        activeSearchQuery,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  )
}
