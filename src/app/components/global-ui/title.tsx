type Props = {
  children: React.ReactNode;
};

function Title({ children }: Props) {
  return (
    <h2 className='text-2xl md:text-4xl py-2 md:py-4 font-bold text-primary-400'>
      {children}
    </h2>
  );
}
export default Title;
