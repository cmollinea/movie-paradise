import { Cast } from 'root/types/person-details';
import { TimeLineWrapper, TimeLineStep } from './';

type Props = {
  cast: Cast[];
};

export const TimeLineContainer = ({ cast }: Props) => {
  const cleanCast = cast.reduce((acc: Cast[], media) => {
    const isNameExists = acc.some((item) =>
      media.name ? media.name === item.name : media.title === item.title
    );
    if (!isNameExists) {
      acc.push(media);
    }
    return acc;
  }, []);

  return (
    <TimeLineWrapper>
      {cleanCast
        .sort((a, b) => {
          return (
            (b.first_air_date ? new Date(b.first_air_date).getFullYear() : 0) -
            (a.first_air_date ? new Date(a.first_air_date).getFullYear() : 0)
          );
        })
        .map((item) => (
          <TimeLineStep
            key={item.id}
            id={item.id}
            rate={item.vote_average}
            mediaType={item.media_type}
            year={
              item.first_air_date
                ? new Date(item.first_air_date).getFullYear().toString()
                : '-'
            }
            mediaTitle={(item.title || item.name) as string}
          />
        ))}
    </TimeLineWrapper>
  );
};
