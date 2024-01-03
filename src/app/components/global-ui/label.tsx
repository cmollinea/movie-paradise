type Props = {
  children: React.ReactNode;
};

export const Label = ({ children }: Props) => {
  return (
    <span className='py-2 text-primary-300 opacity-90 not-italic'>
      {children}
    </span>
  );
};
