import type { PropsWithChildren } from 'react'

export const TagBlock = ({ children }: PropsWithChildren) => {
  return <span className="p-2 m-2 bg-amber-300 text-black">{children}</span>
}
