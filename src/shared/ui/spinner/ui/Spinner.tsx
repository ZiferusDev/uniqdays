type TSpinnerProps = {
  size?: 's' | 'm' | 'l';
};

export const Spinner = ({ size = 'm' }: TSpinnerProps) => {
  const sizeClasses = {
    s: 'h-4 w-4 border-2',
    m: 'h-8 w-8 border-4',
    l: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]}`}
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
