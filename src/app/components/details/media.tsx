import { ApiError } from '@/app/services/queryTMDB';
import { MovieImages } from '../../../../types/movie-images';
import { MovieVideos } from '../../../../types/movie-videos';
import ErrorWithStatus from '../error/api-error';
import SomethingWentWrong from '../error/error';
import MediaTabs from './media-tabs';

type Props = {
  videosPromise: Promise<MovieVideos | ApiError | undefined>;
  imagesPromise: Promise<MovieImages | ApiError | undefined>;
};

async function Media({ videosPromise, imagesPromise }: Props) {
  const [videos, images] = await Promise.all([videosPromise, imagesPromise]);

  if (videos === undefined || images === undefined) {
    return <SomethingWentWrong />;
  }

  if ('statusText' in videos || 'statusText' in images) {
    return (
      <>
        {(videos as ApiError).statusText ? (
          <ErrorWithStatus
            status={(videos as ApiError).status}
            statusText={(videos as ApiError).statusText}
          />
        ) : (
          <ErrorWithStatus
            status={(images as ApiError).status}
            statusText={(images as ApiError).statusText}
          />
        )}
      </>
    );
  }

  return <MediaTabs videos={videos} images={images} />;
}
export default Media;
