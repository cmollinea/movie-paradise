import { BASE_URL } from '@/app/constants/image-url';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { ErrorWithStatus, SomethingWentWrong } from '@/app/components/error';
import { getSeasonUrl } from '@/app/helpers/getSeasonUrl';
import { queryTMDB } from '@/app/services';
import { SeasonResponse } from 'root/types/season-response';
import { Title } from '@/app/components/global-ui';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    number: string | undefined;
  };
};

async function Season({ searchParams, params }: Props) {
  const seasonNumber = searchParams.number || '1';
  const showId = params.id;

  const url = getSeasonUrl(showId, seasonNumber);

  const seasonData = await queryTMDB<SeasonResponse>(url);
  console.log(seasonData);

  if (seasonData === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in seasonData) {
    return (
      <ErrorWithStatus
        status={seasonData.status}
        statusText={seasonData.statusText}
      />
    );
  }

  return (
    <section className='px-4 ld:px-20 py-10'>
      <div className='grid gap-1 font-bold mb-10'>
        <Title>
          Season {seasonData.season_number}
          {seasonData.name.includes(`Season: ${seasonData.season_number}`)
            ? `: ${seasonData.name}`
            : ''}
        </Title>

        <p>
          <span className='opacity-50 font-light'>Air date:</span>{' '}
          {seasonData.air_date ? seasonData.air_date.toLocaleString() : '-'}
        </p>
        <p>
          <span className='opacity-50 font-light'>Total Episodes:</span>{' '}
          {seasonData.episodes.length}
        </p>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 w-full'>
        {seasonData.episodes.map((episode) => (
          // todo crear un componente episode-card

          <Card
            className='max-w-lg w-full grid grid-cols-6 bg-neutral-100/10 backdrop-blur-md'
            key={episode.id}
          >
            <CardHeader className='col-span-2'>
              <Image
                width={185}
                height={104}
                src={BASE_URL + 'w185' + episode.still_path}
                alt={episode.name + 'poster'}
              />
            </CardHeader>
            <div className='col-span-4 w-full h-full relative'>
              {' '}
              <CardBody>
                <h6 className='text-lg font-bold'>
                  Episode {episode.episode_number}
                </h6>
                <p className='text-xs md:text-medium font-semibold'>
                  <i>{episode.name}</i>
                </p>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
export default Season;
