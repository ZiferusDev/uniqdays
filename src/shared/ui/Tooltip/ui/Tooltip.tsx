import { positionClasses, type TTooltipProps } from '../model'

export const Tooltip = ({ text, position = 'top', children }: TTooltipProps) => {
  const tooltipPositionClass = positionClasses[position]

  return (
    <div className="relative inline-flex max-w-full group">
      {children}
      <span
        className={`absolute bg-gray-800 text-amber-50 text-sm font-italic px-2 rounded-2xl
                  opacity-0 transition-opacity group-hover:opacity-100 w-max
                  ${tooltipPositionClass} z-10 pointer-events-none`}
      >
        {text}
      </span>
    </div>
  )
}
