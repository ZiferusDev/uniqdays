// components/GlobalSearch.tsx
import { useState, useEffect, useCallback } from 'react'

import { debounce } from 'lodash'
import { Input } from '~/shared/ui'
import { IconSearch } from '~/shared/ui/Icons'

import { useGlobalSearch } from '../../GlobalSearchContext'

interface IGlobalSearchProps {
  className?: string
}

export const GlobalSearch = ({ className = '' }: IGlobalSearchProps) => {
  const { setGlobalSearchQuery, titleInputValue } = useGlobalSearch()
  const [localInput, setLocalInput] = useState('')

  // Сбрасываем локальный инпут, если начат ввод в форме
  useEffect(() => {
    if (titleInputValue) {
      setLocalInput('')
    }
  }, [titleInputValue])

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3 || value.length === 0) {
        setGlobalSearchQuery(value)
      }
    }, 300),
    [setGlobalSearchQuery]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalInput(value)
    debouncedSetSearch(value)
  }

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [debouncedSetSearch])

  return (
    <Input
      type="text"
      value={localInput}
      onChange={handleChange}
      placeholder={
        titleInputValue
          ? 'Поиск временно отключён (создание задачи)'
          : 'Начните вводить название или описание'
      }
      iconRight={<IconSearch />}
      disabled={!!titleInputValue}
      className={`w-120 ${className}`}
    />
  )
}
