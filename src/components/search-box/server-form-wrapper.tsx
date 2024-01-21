import { BASE_URL } from '@/app/constants/image-url';
import { SearchForm } from '.';

type Props = {
  backgroundPath: string;
};

export function ServerFormWrapper({ backgroundPath }: Props) {
  return (
    <section
      className='min-h-[450px] max-sm:px-10 w-full bg-cover bg-top flex flex-col items-center place-content-center space-y-6 relative overflow-hidden rounded-b-xl'
      style={{
        backgroundImage: `url(${BASE_URL + 'original' + backgroundPath})`
      }}
    >
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-background z-10 opacity-80' />
      <h1 className='text-center text-5xl bg-gradient-to-br from-primary-400 to-secondary-400 py-2 bg-clip-text text-transparent font-bold max-sm:text-4xl z-10'>
        Finding something to watch never had been so easy and cool!
      </h1>
      <SearchForm className='max-w-md' />
    </section>
  );
}
