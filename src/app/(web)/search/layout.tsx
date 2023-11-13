import { SideBar } from '@/app/components/search-sidebar/search-sidebar';

type Props = {
  children: React.ReactNode;
};

const SearchLayout = ({ children }: Props) => {
  const totalResults = {
    movies: 5,
    tv: 2,
    people: 5
  };
  return (
    <section>
      <aside>
        <SideBar totalResults={totalResults} />
      </aside>
      {children}
    </section>
  );
};

export default SearchLayout;
