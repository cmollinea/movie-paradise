import { SearchForm } from '.';

type Props = {
  backgroundPath: string;
};

export function ServerFormWrapper({ backgroundPath }: Props) {
  return (
    <section
      className='min-h-[300px] max-sm:px-10 w-full sm:w-[80%] bg-cover flex flex-col items-center place-content-center space-y-6'
      style={{ backgroundImage: backgroundPath }}
    >
      <h1 className='text-center text-5xl bg-gradient-to-br from-primary-400 to-secondary-400 py-2 bg-clip-text text-transparent font-bold max-sm:text-4xl'>
        Finding something to watch never had been so easy and cool!
      </h1>
      <SearchForm />
    </section>
  );
}
