type Props = {
  children: React.ReactNode;
};

export function Title({ children }: Props) {
  return (
    <h2 className='text-3xl bg-gradient-to-br from-primary-400 to-secondary-400 py-2 bg-clip-text text-transparent font-bold z-10 w-fit'>
      {children}
    </h2>
  );
}
