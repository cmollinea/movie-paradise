import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import MoviesContainer from './components/home/movies-container';
import TopRatedTvShows from './components/home/top-rated-tv-shows';
import TvShowsOnAir from './components/home/tv-shows-on-air';
import { MOVIES_ENPOINTS, TV_SHOWS_ENDPOINTS } from './constants/api-endpoints';
import { queryTMDB } from './services/queryTMDB';

export default async function Home() {
  const tvShowsOnAirResponse = await queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.AIRING_TODAY
  );
  const topRatedTvShowsResponse = queryTMDB<TvShowsResponse>(
    TV_SHOWS_ENDPOINTS.TOP_RATED
  );
  const upcomingMoviesResponse = queryTMDB<MovieResponse>(
    MOVIES_ENPOINTS.UPCOMING
  );
  const topRatedMoviesResponse = queryTMDB<MovieResponse>(
    MOVIES_ENPOINTS.TOP_RATED
  );

  return (
    <>
      {/* AQUI DEBE IR UN FORM PARA BUSQUEDA */}
      <section className='overflow-hidden container px-20 py-10 relative'>
        <h2>Airing Today</h2>
        <TvShowsOnAir tvShowsOnAirResponse={tvShowsOnAirResponse} />
      </section>
      <section className='overflow-hidden container px-20 py-10 relative'>
        <h2>Top Rated Tv Shows</h2>
        <TopRatedTvShows promise={topRatedTvShowsResponse} />
      </section>
      <section className='overflow-hidden container px-20 py-10 relative'>
        <h2>Upcoming Movies</h2>
        <MoviesContainer promise={upcomingMoviesResponse} />
      </section>
      <section className='overflow-hidden container px-20 py-10 relative'>
        <h2>Top Rated Movies</h2>
        <MoviesContainer promise={topRatedMoviesResponse} />
      </section>
    </>
  );
}
