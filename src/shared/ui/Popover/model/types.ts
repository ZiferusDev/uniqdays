import { PropsWithChildren, ReactNode } from 'react';

export type TPopoverPosition = 'left' | 'top' | 'right' | 'bottom';

export type TPopoverProps = PropsWithChildren<{
  content: ReactNode;
  position?: TPopoverPosition;
  opened?: boolean;
  setOpened?: (isOpen: boolean) => void;
}>;
