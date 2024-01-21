type Props = {
  children: React.ReactNode;
};

export const CardInfoContainer = ({ children }: Props) => {
  return (
    <div className='relative grid grid-cols-12 gap-4 z-20 p-4'>{children}</div>
  );
};
