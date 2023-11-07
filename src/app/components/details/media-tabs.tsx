'use client';
import { ImagePreview, VideoPlayer } from '.';
import { Tabs, Tab } from '@nextui-org/react';
import { useState } from 'react';
import CardContainer from '../home/card-container';

import type { MovieImages, MovieVideos } from 'root/types';

type Props = {
  images: MovieImages;
  videos: MovieVideos;
};

function MediaTabs({ images, videos }: Props) {
  const [selected, setSelected] = useState('images');

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
        <Tab key='videos' title='Videos' className=''>
          <div className='container overflow-hidden'>
            <CardContainer>
              {videos.results.map((video) => {
                const url = 'https://www.youtube.com/watch?v=' + video.key;
                return <VideoPlayer key={video.id} url={url} />;
              })}
            </CardContainer>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
export default MediaTabs;
