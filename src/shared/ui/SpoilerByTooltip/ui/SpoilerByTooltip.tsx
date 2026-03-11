import { useRef, useState, useEffect } from 'react'

import { Tooltip } from '../../Tooltip'

interface ISpoilerByTooltipProps {
  text: string
  className?: string
  lines?: number // Количество строк для обрезания
}

export const SpoilerByTooltip = ({ text, className = '', lines = 1 }: ISpoilerByTooltipProps) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current

        if (lines > 1) {
          // Для многострочного обрезания
          setIsTruncated(element.scrollHeight > element.clientHeight)
        } else {
          // Для однострочного обрезания
          setIsTruncated(element.scrollWidth > element.clientWidth)
        }
      }
    }

    checkTruncation()

    window.addEventListener('resize', checkTruncation)

    const resizeObserver = new ResizeObserver(() => {
      checkTruncation()
    })

    if (textRef.current) {
      resizeObserver.observe(textRef.current)
    }

    return () => {
      window.removeEventListener('resize', checkTruncation)
      resizeObserver.disconnect()
    }
  }, [text, lines])

  const truncateClass = lines > 1 ? `line-clamp-${lines}` : 'truncate'

  if (!isTruncated) {
    return (
      <div ref={textRef} className={`${truncateClass} ${className}`}>
        {text}
      </div>
    )
  }

  return (
    <Tooltip text={text}>
      <div ref={textRef} className={`${truncateClass} ${className}`}>
        {text}
      </div>
    </Tooltip>
  )
}
