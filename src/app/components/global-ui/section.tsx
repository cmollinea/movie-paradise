type Props = {
  children: React.ReactNode;
};

export const Section = ({ children }: Props) => {
  return (
    <section className='relative overflow-hidden py-4 md:py-10 px-4 lg:px-20 container max-sm:max-w-[100vw]'>
      {children}
    </section>
  );
};
