import { ApiError } from '@/app/services/queryTMDB';
import { log } from 'console';
import { Credits } from '../../../../types/movie-credits';
import ErrorWithStatus from '../error/api-error';
import SomethingWentWrong from '../error/error';
import CardContainer from '../home/card-container';
import ActorCard from './actor-card';

type Props = {
  promise: Promise<Credits | ApiError | undefined>;
};

async function Cast({ promise }: Props) {
  const credits = await promise;

  if (credits === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in credits) {
    return (
      <ErrorWithStatus
        status={credits.status}
        statusText={credits.statusText}
      />
    );
  }

  return (
    <section className='overflow-hidden container'>
      {' '}
      <CardContainer>
        {credits.cast.map((actor) => {
          if (actor.known_for_department === 'Acting') {
            return (
              <ActorCard
                key={actor.id}
                name={actor.name}
                src={actor.profile_path}
              />
            );
          } else return;
        })}
      </CardContainer>
    </section>
  );
}
export default Cast;
