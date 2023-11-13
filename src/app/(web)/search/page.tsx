import { queryTMDB } from '@/app/services';

type Props = {
  searchParams:
    | { query: string; target: string }
    | { [key: string]: string | string[] | undefined };
};

function SearchResults({ searchParams }: Props) {
  const query = searchParams.query ? searchParams.query : '';
  const target = searchParams.target ? searchParams.target : 'movie';

  //todo conformar la url a aprtir de los strings

  const data = queryTMDB<'Aqui debe ir los tipos'>('Poer aqui la url ');
  return <div>SearchResults</div>;
}

export default SearchResults;
