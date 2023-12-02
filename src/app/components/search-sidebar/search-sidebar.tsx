import { TargetButtonLink } from './target-button';

const targets = Object.freeze({
  Movies: 'movies',
  Collections: 'collections',
  TvShows: 'tv',
  People: 'people'
});

type Props = {
  totalResults: {
    movies: number;
    collections: number;

    tv: number;
    people: number;
  };
};

export const SideBar = ({ totalResults }: Props) => {
  return (
    <nav className='flex items-center place-content-center overflow-auto container'>
      <ul className='flex max-md:max-w-sm max-lg:px-4 py-6 scrollbar-hide max-lg:snap-x lg:flex-col max-lg:space-x-4 lg:space-y-4 overflow-x-auto'>
        {Object.entries(targets).map(([key, value]) => (
          <TargetButtonLink
            key={key}
            resultsCount={totalResults[value]}
            target={value}
          >
            {key}
          </TargetButtonLink>
        ))}
      </ul>
    </nav>
  );
};
