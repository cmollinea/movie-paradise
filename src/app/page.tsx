import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import MoviesContainer from './components/Home/movies-container';
import TopRatedTvShows from './components/Home/top-rated-tv-shows';
import TvShowsOnAir from './components/Home/tv-shows-on-air';
import {
  AIRING_TODAY_TV_SHOWS_ENDPOINT,
  TOP_RATED_MOVIES_ENDPOINT,
  TOP_RATED_TV_SHOWS_ENDPOINT,
  UPCOMING_MOVIES_API
} from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';

export default async function Home() {
  const tvShowsOnAirResponse = await queryTMDB<TvShowsResponse>(
    AIRING_TODAY_TV_SHOWS_ENDPOINT
  );
  const topRatedTvShowsResponse = queryTMDB<TvShowsResponse>(
    TOP_RATED_TV_SHOWS_ENDPOINT
  );
  const upcomingMoviesResponse = queryTMDB<MovieResponse>(UPCOMING_MOVIES_API);
  const topRatedMoviesResponse = queryTMDB<MovieResponse>(
    TOP_RATED_MOVIES_ENDPOINT
  );

  return (
    <>
      {/* AQUI DEBE IR UN FORM PARA BUSQUEDA */}
      <section className='overflow-hidden container px-10 relative'>
        <h2>Airing Today</h2>
        <TvShowsOnAir tvShowsOnAirResponse={tvShowsOnAirResponse} />
      </section>
      <section className='overflow-hidden container px-10 relative'>
        <h2>Top Rated Tv Shows</h2>
        <TopRatedTvShows promise={topRatedTvShowsResponse} />
      </section>
      <section className='overflow-hidden container px-10 relative'>
        <h2>Upcoming Movies</h2>
        <MoviesContainer promise={upcomingMoviesResponse} />
      </section>
      <section className='overflow-hidden container px-10 relative'>
        <h2>Top Rated Movies</h2>
        <MoviesContainer promise={topRatedMoviesResponse} />
      </section>
    </>
  );
}
