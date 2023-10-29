'use client';
import { Tabs, Tab } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { MovieImages } from '../../../../types/movie-images';
import { MovieVideos } from '../../../../types/movie-videos';
import CardContainer from '../home/card-container';
import ImagePreview from './image-preview';
import VideoPlayer from './video-player';
import { BASE_URL } from '@/app/constants/image-url';

type Props = {
  images: MovieImages;
  videos: MovieVideos;
};

function MediaTabs({ images, videos }: Props) {
  const [selected, setSelected] = useState('videos');
  const [showVideos, setShowVideos] = useState<'yes' | 'no'>('no');

  useEffect(() => {
    if (showVideos === 'no') {
      setShowVideos('yes');
    }
  }, [showVideos]);
  return (
    <div>
      <Tabs
        variant='underlined'
        aria-label='Options'
        selectedKey={selected}
        // @ts-expect-error
        onSelectionChange={setSelected}
        className='relative'
      >
        <Tab key='videos' title='Videos' className=''>
          <div className='container overflow-hidden'>
            <CardContainer>
              {showVideos === 'yes' ? (
                videos.results.map((video) => {
                  const url = 'https://www.youtube.com/watch?v=' + video.key;
                  return <VideoPlayer key={video.id} url={url} />;
                })
              ) : (
                <p>Loading Spinner</p>
              )}
            </CardContainer>
          </div>
        </Tab>
        <Tab key='images' title='Images'>
          <CardContainer>
            {images.backdrops.map((image) => (
              <ImagePreview
                key={image.file_path}
                image={image.file_path}
                votes={image.vote_average}
                type='backdrop'
              />
            ))}
          </CardContainer>
        </Tab>
        <Tab key='posters' title='Posters'>
          <CardContainer>
            {images.posters.map((image) => (
              <ImagePreview
                key={image.file_path}
                image={image.file_path}
                votes={image.vote_average}
                type='poster'
              />
            ))}
          </CardContainer>
        </Tab>
      </Tabs>{' '}
    </div>
  );
}
export default MediaTabs;
