import { ErrorWithStatus, SomethingWentWrong } from '@/app/components/error';
import { Section } from '@/app/components/global-ui';
import { CardContainer, CardLink } from '@/app/components/home';
import { BASE_URL, POSTER_SIZES } from '@/app/constants/image-url';
import { getTMDBEndpoint } from '@/app/helpers';
import { queryTMDB } from '@/app/services';
import { Image } from '@nextui-org/react';
import { MediaType } from 'root/types';
import { Cast, PersonDetails } from 'root/types/person-details';

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

  const bestCast: Cast[] = [];

  function customSort(a: Cast, b: Cast) {
    // First condition: Sort based on the greater value of property1 and property2 combined
    const sumA =
      a.vote_average + a.vote_count + (a.episode_count ? a.episode_count : 0);
    const sumB =
      b.vote_average + b.vote_count + (b.episode_count ? b.episode_count : 0);

    if (sumA < sumB) {
      return 1; // Greater sum comes first
    } else if (sumA > sumB) {
      return -1; // Lesser sum comes first
    } else {
      return 0; // Sums are equal
    }
  }

  peopleDetails.combined_credits.cast.sort(customSort).forEach((element) => {
    if (bestCast.length === 8) {
      return;
    }
    bestCast.push(element);
  });

  console.log(bestCast.map((item) => item.name || item.title));

  return (
    <section className='py-16'>
      <div className='flex max-md:flex-col container md:space-x-4'>
        <div className='w-fit px-4'>
          <div>
            <Image
              alt={`${peopleDetails.name} profile pic`}
              src={BASE_URL + POSTER_SIZES.sm + peopleDetails.profile_path}
              width={185}
            />
            <aside>
              {peopleDetails.homepage && (
                <a href={peopleDetails.homepage}>{peopleDetails.homepage}</a>
              )}
              <p>
                <span>Known for:</span>
                <br />
                {peopleDetails.known_for_department}
              </p>
              <p>
                <span>Known credits:</span>
                <br />
                {peopleDetails.combined_credits.cast.length}
              </p>
              <p>
                <span>Gender:</span>
                <br />
                {peopleDetails.gender}
              </p>
              <p>
                <span>Birthday:</span>
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
                <span>Place of birthday:</span>
                <br />
                {peopleDetails.place_of_birth}
              </p>
              <p>Also known as:</p>
              {peopleDetails.also_known_as.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </aside>
          </div>
        </div>
        <Section>
          <h1>{peopleDetails.name}</h1>
          <article>
            <p
              className=''
              dangerouslySetInnerHTML={{ __html: formattedString }}
            />
          </article>
          <Section>
            <CardContainer withButtons={false}>
              {bestCast.map((item) => {
                const element = {
                  id: item.id,
                  name: (item.name || item.title) as string,
                  rating: item.vote_average,
                  poster_path: item.poster_path || ''
                };
                return (
                  <CardLink
                    element={element}
                    type={item.media_type as MediaType}
                    imageSizes='poster'
                    key={item.id}
                  />
                );
              })}
            </CardContainer>
          </Section>
        </Section>
      </div>
    </section>
  );
}
export default People;
