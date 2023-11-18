import { MovieResponse, PeopleResponse, TvShowsResponse } from 'root/types';
import { Target } from '../components/search-sidebar/target-button';
import { CardLink } from '../components/home';
import { ActorCard } from '../components/details';

export const pickSearchResultsType = (selected: Target, list: any) => {
  let data: React.ReactNode[];
  switch (selected) {
    case 'movies':
      const movies = (list as MovieResponse).results;
      return (data = movies.map((movie) => (
        <CardLink
          type='movies'
          imageSizes='poster'
          element={{
            id: movie.id,
            name: movie.title,
            poster_path: movie.poster_path,
            rating: movie.vote_average
          }}
          key={movie.id}
        />
      )));

    case 'tv':
      const tv = (list as TvShowsResponse).results;
      return (data = tv.map((show) => (
        <CardLink
          type='tv'
          imageSizes='poster'
          element={{
            id: show.id,
            name: show.name,
            poster_path: show.poster_path,
            rating: show.vote_average
          }}
          key={show.id}
        />
      )));
      break;

    case 'collections':
      break;

    case 'people':
      const people = (list as PeopleResponse).results;
      return (data = people.map((item) => (
        <ActorCard name={item.name} src={item.profile_path} key={item.id} />
      )));
      break;

    default:
      throw new Error(
        "Selected must be 'movies' | 'tv |'collections' | 'people "
      );
  }
};
