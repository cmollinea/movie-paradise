import { ActorCard } from '.';
import { ApiError } from '@/app/services/queryTMDB';
import { CardContainer } from '../home';
import { SomethingWentWrong, ErrorWithStatus } from '../error';

import type { Credits } from 'root/types';

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
