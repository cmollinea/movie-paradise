import { BASE_URL, POSTER_SIZES } from '@/constants/image-url';
import { ErrorWithStatus, SomethingWentWrong } from '@/components/error';
import { getTMDBEndpoint } from '@/helpers';
import { Image } from '@nextui-org/react';
import { Metadata } from 'next';
import { PeopleBiography } from '@/components/people-biography/people-biography';
import { PeopleMedia } from '@/components/people-media/people-media';
import { PersonDetails } from 'root/types/person-details';
import { queryTMDB } from '@/services';
import { TimeLineContainer } from '@/components/timeline/timeline-container';
import { Title, Label } from '@/components/global-ui';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const detailsUrl = getTMDBEndpoint(id, 'people');

  // fetch data

  const peopleDetails = await queryTMDB<PersonDetails>(detailsUrl);

  if (peopleDetails && !('statusText' in peopleDetails)) {
    return {
      title: peopleDetails.name + ' • Movie Paradise',
      description: peopleDetails.biography.replace(/\n/g, ''),
      openGraph: {
        type: 'website',
        url: `https://movie-paradise-seven.vercel/people/${id}`,
        title: peopleDetails.name + ' • Movie Paradise',
        description: peopleDetails.biography.replace(/\n/g, ''),
        siteName: 'Movie Paradise',
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + peopleDetails.profile_path}`,
            secureUrl: `${
              BASE_URL + POSTER_SIZES.xxs + peopleDetails.profile_path
            }`,
            width: 92,
            height: 138,
            type: 'jpg',
            alt: peopleDetails.name + 'poster'
          }
        ]
      },
      twitter: {
        site: `https://movie-paradise-seven.vercel/people/${id}`,
        title: peopleDetails.name + ' • Movie Paradise',
        description: peopleDetails.biography.replace(/\n/g, ''),
        images: [
          {
            url: `${BASE_URL + POSTER_SIZES.xxs + peopleDetails.profile_path}`,
            width: 92,
            height: 138
          }
        ]
      }
    };
  }
  return {
    title: 'Error geting metadata • Movie Paradise',
    description: 'No description'
  };
}

async function People({ params }: Props) {
  const id = params.id;
  const detailsUrl = getTMDBEndpoint(id, 'people');
  const peopleDetails = await queryTMDB<PersonDetails>(detailsUrl);

  if (peopleDetails === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in peopleDetails) {
    return (
      <ErrorWithStatus
        status={peopleDetails.status}
        statusText={peopleDetails.statusText}
      />
    );
  }

  return (
    <section>
      <div className='flex max-md:flex-col md:space-x-16 px-8 xl:px-20 max-md:space-y-4'>
        <div className='w-fit text-sm md:text-lg italic'>
          <div className='flex flex-col space-y-4'>
            <div className='relative w-full h-full'>
              <Title className='md:hidden w-full mb-4'>
                {peopleDetails.name}
              </Title>
              <Image
                alt={`${peopleDetails.name} profile pic`}
                src={BASE_URL + POSTER_SIZES.sm + peopleDetails.profile_path}
                width={185}
                height={278}
                className='min-w-[185px] min-h-[278px] max-md:max-w-[120px] max-md:max-h-[200px] w-full'
              />
            </div>
            {peopleDetails.homepage && (
              <a href={peopleDetails.homepage}>{peopleDetails.homepage}</a>
            )}
            <aside className='grid max-md:grid-cols-2'>
              <p>
                <Label>Known for:</Label>
                <br />
                {peopleDetails.known_for_department}
              </p>
              <p>
                <Label>Known credits:</Label>
                <br />
                {peopleDetails.combined_credits.cast.length}
              </p>
              <p>
                <Label>Gender:</Label>
                <br />
                {peopleDetails.gender === 1 ? 'Female' : 'Male'}
              </p>
              <p>
                <Label>Birthday:</Label>
                <br />
                {new Date(peopleDetails.birthday).toLocaleDateString()} (
                {new Date().getFullYear() -
                  new Date(peopleDetails.birthday).getFullYear()}{' '}
                years old)
              </p>
              <p
                title={peopleDetails.place_of_birth}
                className='max-w-[200px] truncate'
              >
                <Label>Place of birthday:</Label>
                <br />
                {peopleDetails.place_of_birth}
              </p>
              <div className='max-md:hidden'>
                <Label>Also known as:</Label>
                {peopleDetails.also_known_as.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </aside>
          </div>
        </div>
        <section className='space-y-4 md:space-y-16 relative md:max-w-[60vw]'>
          <div>
            <Title className='max-md:hidden'>{peopleDetails.name}</Title>
            <PeopleBiography biography={peopleDetails.biography} />
          </div>
          <PeopleMedia
            cast={peopleDetails.combined_credits.cast}
            biography={peopleDetails.biography}
            name={peopleDetails.name}
          />
          <TimeLineContainer cast={peopleDetails.combined_credits.cast} />
        </section>
      </div>
    </section>
  );
}
export default People;
