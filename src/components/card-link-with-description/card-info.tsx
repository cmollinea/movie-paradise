type Props = {
  children: React.ReactNode;
};

export const CardInfo = ({ children }: Props) => {
  return <div className='col-span-9 grid gap-2 h-fit'>{children}</div>;
};
