import { ErrorWithStatus, SomethingWentWrong } from '@/app/components/error';
import { BASE_URL } from '@/app/constants/image-url';
import { getSeasonUrl } from '@/app/helpers/getSeasonUrl';
import { queryTMDB } from '@/app/services';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
} from '@nextui-org/react';
import { SeasonResponse } from 'root/types/season-response';

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
    <section className='px-20 py-16'>
      <div className='grid gap-1 font-bold mb-10'>
        <h1 className='text-3xl'>
          Season {seasonData.season_number}
          {seasonData.name.includes(`Season: ${seasonData.season_number}`)
            ? `: ${seasonData.name}`
            : ''}
        </h1>
        <p>Air date: {seasonData.air_date.toLocaleString()}</p>
        <p>Total Episodes: {seasonData.episodes.length}</p>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 w-full'>
        {seasonData.episodes.map((episode) => (
          // todo crear un componente episode-card

          <Card className='max-w-lg w-full grid grid-cols-6' key={episode.id}>
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
