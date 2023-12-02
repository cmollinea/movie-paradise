import { ActorCard } from '.';
import { CardContainer } from '../home';
import { SomethingWentWrong } from '../error';

import type { Credits } from 'root/types/movie-response-full';

type Props = {
  credits: Credits;
};

export async function Cast({ credits }: Props) {
  if (credits === undefined) {
    return <SomethingWentWrong />;
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
