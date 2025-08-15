import { positionClasses, type TTooltipProps } from '../model'

export const Tooltip = ({ text, position = 'top', children }: TTooltipProps) => {
  const tooltipPositionClass = positionClasses[position]
  return (
    <div className="relative inline-flex max-w-full">
      {children}
      <span
        className={`absolute bg-gray-800 text-amber-50 text-sm font-semibold px-2 rounded-2xl
                  invisible opacity-0 transition-opacity hover:visible hover:opacity-100
                  ${tooltipPositionClass} z-0`}
      >
        {text}
      </span>
    </div>
  )
}
