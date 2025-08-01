import { ReactNode } from 'react';

export const TodoCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-col justify-center items-center">
      <div>Вот это да, карточка</div>
      {children}
    </div>
  );
};
