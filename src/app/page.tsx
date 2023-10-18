import { MovieResponse } from '../../types/movie-response-interface';
import { TvShowsResponse } from '../../types/tvshows-response-interface';
import {
  AIRING_TODAY_TV_SHOWS_ENDPOINT,
  POPULAR_MOVIES_ENDPOINT,
  TOP_RATED_MOVIES_ENDPOINT,
  POPULAR_TV_SHOWS_ENDPOINT
} from './constants/api-endpoints';
import { queryTMDB, ApiError } from './services/queryTMDB';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const tvShowsOnAir = await queryTMDB<TvShowsResponse>(
    AIRING_TODAY_TV_SHOWS_ENDPOINT
  );
  const popularTvShows = queryTMDB<TvShowsResponse>(POPULAR_TV_SHOWS_ENDPOINT);
  const mostPopularMovies = queryTMDB<MovieResponse>(POPULAR_MOVIES_ENDPOINT);
  const topRatedMovies = queryTMDB<MovieResponse>(TOP_RATED_MOVIES_ENDPOINT);

  const queryWentWell =
    typeof tvShowsOnAir !== 'undefined' &&
    Boolean((tvShowsOnAir as TvShowsResponse).page);

  return (
    <main className=' text-foreground'>
      {/* AQUI DEBE IR UN FORM PARA BUSQUEDA */}
      <section>
        <h2>Airing Today</h2>
        <div>
          {queryWentWell ? (
            <div>{(tvShowsOnAir as TvShowsResponse).total_pages}</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
