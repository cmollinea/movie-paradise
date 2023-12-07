'use client';
import { Season } from 'root/types';
import { CardInfo } from '../card-link-with-description/card-info';
import { CardInfoContainer } from '../card-link-with-description/card-info-container';
import { CardPoster } from '../card-link-with-description/card-poster';
import { CardWrapper } from '../card-link-with-description/card-wrapper';
import { useParams } from 'next/navigation';

type Props = {
  seasons: Season[];
};

export const SeasonContainer = ({ seasons }: Props) => {
  const params = useParams();
  const id = params.id;
  return (
    <ul className='w-fit grid gap-6 max-w-[95vw] mt-4'>
      {seasons.map((season) => {
        if (season.season_number > 0) {
          const seasonLink = `/tv/${id}/season-${season.season_number}`;
          return (
            <CardWrapper key={season.id} title={season.name} link={seasonLink}>
              <CardInfoContainer>
                <CardPoster
                  title={season.name}
                  poster={season.poster_path}
                  isOverviewProvided={Boolean(season.overview)}
                />
                <CardInfo>
                  <p
                    className={`${
                      season.overview && 'text-xl md:text-2xl lg:text-3xl'
                    } text-xl font-black`}
                  >
                    Season {season.season_number}
                  </p>
                  {!season.name.includes('Season') && (
                    <p className='text-lg md:text-xl truncate'>
                      <b>{season.name}</b>
                    </p>
                  )}
                  <p className='max-lg:text-xs'>
                    <i>
                      {season.overview ? season.overview : 'No info provided'}
                    </i>
                  </p>
                </CardInfo>
              </CardInfoContainer>
            </CardWrapper>
          );
        }
      })}
    </ul>
  );
};
