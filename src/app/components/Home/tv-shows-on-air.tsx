import { ApiError } from '@/app/services/queryTMDB';
import { TvShowsResponse } from '../../../../types/tvshows-response-interface';
import ErrorWithStatus from '../error/api-error';
import SomethingWentWrong from '../error/error';
import Card from './card';
import CardContainer from './card-container';

type Props = {
  tvShowsOnAirResponse: TvShowsResponse | ApiError | undefined;
};

function TvShowsOnAir({ tvShowsOnAirResponse }: Props) {
  const error = tvShowsOnAirResponse as ApiError;
  const tvShowsOnAir = tvShowsOnAirResponse as TvShowsResponse;

  return (
    <>
      {/* ALGO SALIO MAL */}
      {typeof tvShowsOnAirResponse === 'undefined' && <SomethingWentWrong />}

      {/* LA PETICION FUE SATISFACTORIA */}
      {tvShowsOnAir?.results !== undefined && (
        <CardContainer>
          {tvShowsOnAir.results.map((item) => {
            const element = {
              id: item.id,
              name: item.name,
              rating: item.vote_average,
              poster_path: item.poster_path
            };
            return <Card type='tv' element={element} key={item.id} />;
          })}
        </CardContainer>
      )}

      {/* ERROR DE LA API */}
      {error?.status !== undefined && (
        <ErrorWithStatus status={error.status} statusText={error.statusText} />
      )}
    </>
  );
}
export default TvShowsOnAir;
