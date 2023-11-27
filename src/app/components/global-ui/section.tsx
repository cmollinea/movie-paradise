type Props = {
  children: React.ReactNode;
};

export const Section = ({ children }: Props) => {
  return (
    <section className='relative container py-10 px-4 md:px-20'>
      {children}
    </section>
  );
};
