import { Cast } from 'root/types/person-details';
import { CardContainer, CardLink } from '../home';
import { Title } from '../global-ui';

type Props = {
  cast: Cast[];
  name: string;
  biography: string;
};

export const PeopleMedia = ({ cast, name, biography }: Props) => {
  const bestCast: Cast[] = [];

  const cleanCast = cast.reduce((acc: Cast[], media) => {
    const isNameExists = acc.some((item) =>
      media.name ? media.name === item.name : media.title === item.title
    );
    if (!isNameExists) {
      acc.push(media);
    }
    return acc;
  }, []);

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

  cleanCast.sort(customSort).forEach((element) => {
    if (bestCast.length === 8) {
      return;
    }
    bestCast.push(element);
  });

  const knownMedia = cleanCast.filter((item) =>
    biography.includes((item.name || item.title) as string)
  );

  return (
    <section className=''>
      <Title>If you like {name} maybe you want to look out for:</Title>
      <section className='overflow-hidden relative max-md:max-w-[90vw]'>
        <CardContainer withButtons={false}>
          {knownMedia.length > 0
            ? knownMedia.map((item) => {
                const element = {
                  id: item.id,
                  name: (item.name || item.title) as string,
                  rating: item.vote_average,
                  poster_path: item.poster_path || ''
                };
                return (
                  <CardLink
                    element={element}
                    type={item.media_type === 'tv' ? item.media_type : 'movies'}
                    imageSizes='poster'
                    key={item.id}
                  />
                );
              })
            : bestCast.map((item) => {
                const element = {
                  id: item.id,
                  name: (item.name || item.title) as string,
                  rating: item.vote_average,
                  poster_path: item.poster_path || ''
                };
                return (
                  <CardLink
                    element={element}
                    type={item.media_type === 'tv' ? item.media_type : 'movies'}
                    imageSizes='poster'
                    key={item.id}
                  />
                );
              })}
        </CardContainer>
      </section>
    </section>
  );
};
