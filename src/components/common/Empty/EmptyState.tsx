import { ReactNode } from 'react';

type EmptyStateProps = {
  message: string;
  icon?: ReactNode;
};

const EmptyState = ({ message, icon }: EmptyStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-139px)]'>
      <span>{icon}</span>
      <p className='mt-[20px] text-base text-gray-500'>{message}</p>
    </div>
  );
};

export default EmptyState;
