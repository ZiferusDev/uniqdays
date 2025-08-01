import { PropsWithChildren } from 'react';

export type TTooltipPosition = 'left' | 'top' | 'right' | 'bottom';

export type TTooltipProps = PropsWithChildren<{
  text: string;
  position?: TTooltipPosition;
}>;
