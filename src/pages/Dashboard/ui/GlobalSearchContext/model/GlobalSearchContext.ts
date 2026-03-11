import { createContext } from 'react'

interface IGlobalSearchContext {
  globalSearchQuery: string
  setGlobalSearchQuery: (query: string) => void
  titleInputValue: string
  setTitleInputValue: (value: string) => void
  activeSearchQuery: string
}

export const GlobalSearchContext = createContext<IGlobalSearchContext | undefined>(undefined)
