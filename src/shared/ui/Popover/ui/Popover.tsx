import { useState, useRef, useEffect, useCallback } from 'react'

import { positionClasses, type TPopoverProps } from '../model'

export const Popover: React.FC<TPopoverProps> = ({
  children,
  content,
  position = 'top',
  opened,
  setOpened,
}) => {
  // Контролируемый или неконтролируемый режим
  const [isOpenInternal, setIsOpenInternal] = useState(false)
  const isControlled = typeof opened === 'boolean' && typeof setOpened === 'function'
  const isOpen = isControlled ? opened : isOpenInternal

  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Функция смены состояния открытия
  const changeOpenState = useCallback(
    (nextState: boolean) => {
      if (isControlled) {
        setOpened(nextState)
      } else {
        setIsOpenInternal(nextState)
      }
    },
    [isControlled, setOpened]
  )

  const onTogglePopover = () => changeOpenState(!isOpen)

  // Закрытие по клику вне поповера и триггера
  useEffect(() => {
    if (!isOpen) return

    function handleDocumentClick(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        changeOpenState(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [changeOpenState, isOpen])

  const popoverPositionClass = positionClasses[position]

  return (
    <div className="inline-block relative" ref={triggerRef}>
      <button onClick={onTogglePopover} className="cursor-pointer outline-0 border-0">
        {children}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 bg-gray-700 text-amber-50 shadow-lg rounded p-4 border-0 outline-0 ${popoverPositionClass}`}
          style={{ minWidth: 200 }}
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  )
}
