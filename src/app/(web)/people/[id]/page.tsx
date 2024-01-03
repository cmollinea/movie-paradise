import { ErrorWithStatus, SomethingWentWrong } from '@/app/components/error';
import { Title } from '@/app/components/global-ui';
import { Label } from '@/app/components/global-ui/label';
import { PeopleMedia } from '@/app/components/people-media/people-media';
import { TimeLineContainer } from '@/app/components/timeline/timeline-container';
import { BASE_URL, POSTER_SIZES } from '@/app/constants/image-url';
import { getTMDBEndpoint } from '@/app/helpers';
import { queryTMDB } from '@/app/services';
import { Image } from '@nextui-org/react';
import { PersonDetails } from 'root/types/person-details';

type Props = {
  params: {
    id: string;
  };
};

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

  const formattedString = peopleDetails.biography.replace(/\n/g, '<br />');

  console.log(
    peopleDetails.biography.split(/\n/).filter((item) => item !== '').length
  );

  return (
    <section className='py-6 md:py-16 px-6'>
      <div className='flex max-md:flex-col container md:space-x-16 px-6 xl:px-20 max-md:space-y-4'>
        <div className='w-fit text-sm md:text-lg italic'>
          <div className='flex flex-col space-y-4'>
            <div className='relative w-full h-full'>
              <Image
                alt={`${peopleDetails.name} profile pic`}
                src={BASE_URL + POSTER_SIZES.sm + peopleDetails.profile_path}
                width={185}
                height={278}
                className='min-w-[185px] min-h-[278px]'
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
        <section className='space-y-4 md:space-y-16 relative'>
          <article>
            <Title className='max-md:hidden'>{peopleDetails.name}</Title>
            <p
              className='text-sm md:text-lg'
              dangerouslySetInnerHTML={{ __html: formattedString }}
            />
          </article>
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
