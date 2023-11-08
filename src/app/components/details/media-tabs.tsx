'use client';
import { ImagePreview, VideoPlayer } from '.';
import { Tabs, Tab } from '@nextui-org/react';
import { useState } from 'react';
import CardContainer from '../home/card-container';

import type { MovieImages, MovieVideos } from 'root/types';
import { ImageContainer } from '../home';

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
          <div className='min-h-[280px]'>
            <CardContainer>
              {images.backdrops.map((image) => (
                <ImageContainer
                  image={image.file_path}
                  imageSizes='backdrop'
                  key={image.file_path}
                />
              ))}
            </CardContainer>
          </div>
        </Tab>
        <Tab key='posters' title='Posters'>
          <div className='min-h-[280px]'>
            <CardContainer>
              {images.posters.map((image) => (
                <ImageContainer
                  image={image.file_path}
                  imageSizes='poster'
                  key={image.file_path}
                />
              ))}
            </CardContainer>
          </div>
        </Tab>
        <Tab key='videos' title='Videos' className=''>
          <div className='min-h-[280px]'>
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
