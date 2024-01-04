import { SearchForm } from '@/app/components/search-box';
import { SideBar } from '@/app/components/search-sidebar';
import { SearchContextProvider } from '@/app/context';

type Props = {
  children: React.ReactNode;
};

const SearchLayout = ({ children }: Props) => {
  return (
    <>
      <SearchContextProvider>
        <section className='grid lg:grid-cols-12 w-full py-16 place-content-center min-[2400px]:w-fit'>
          <aside className='lg:col-span-3'>
            <nav className='flex items-center place-content-center overflow-auto container'>
              <SideBar />
            </nav>
          </aside>
          {children}
        </section>
      </SearchContextProvider>
    </>
  );
};
export default SearchLayout;
