import { useState, useRef, useEffect } from 'react';
import { positionClasses, type TPopoverProps } from '../model';

export const Popover: React.FC<TPopoverProps> = ({
  children,
  content,
  position = 'top',
  opened,
  setOpened,
}) => {
  // Контролируемый или неконтролируемый режим
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isControlled = typeof opened === 'boolean' && typeof setOpened === 'function';
  const isOpen = isControlled ? opened : isOpenInternal;

  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Функция смены состояния открытия
  const changeOpenState = (nextState: boolean) => {
    if (isControlled) {
      setOpened(nextState);
    } else {
      setIsOpenInternal(nextState);
    }
  };

  // Закрытие по клику вне поповера и триггера
  useEffect(() => {
    if (!isOpen) return;

    function handleDocumentClick(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        changeOpenState(false);
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen]);

  const popoverPositionClass = positionClasses[position];

  return (
    <div className="inline-block relative" ref={triggerRef}>
      <div onClick={() => changeOpenState(!isOpen)} style={{ cursor: 'pointer' }}>
        {children}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 bg-gray-700 text-amber-50 border shadow-lg rounded p-4 ${popoverPositionClass}`}
          style={{ minWidth: 200 }}
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  );
};
