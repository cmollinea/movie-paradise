import { ApiError } from '@/app/services/queryTMDB';
import { MovieImages, MovieVideos } from 'root/types';
import { SomethingWentWrong, ErrorWithStatus } from '../error';
import { MediaTabs } from '.';

type Props = {
  videosPromise: Promise<MovieVideos | ApiError | undefined>;
  imagesPromise: Promise<MovieImages | ApiError | undefined>;
};

export async function Media({ videosPromise, imagesPromise }: Props) {
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
