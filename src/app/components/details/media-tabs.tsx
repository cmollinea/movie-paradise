'use client';
import { VideoPlayer } from '.';
import { Tabs, Tab } from '@nextui-org/react';
import { useState } from 'react';
import { CardContainer, ImageContainer } from '../home';
import { Images, Videos } from 'root/types/movie-response-full';

type Props = {
  images: Images;
  videos: Videos;
};

export function MediaTabs({ images, videos }: Props) {
  const [selected, setSelected] = useState('images');

  return (
    <div>
      <Tabs
        color='primary'
        variant='light'
        aria-label='Options'
        selectedKey={selected}
        // @ts-expect-error
        onSelectionChange={setSelected}
        className='relative'
      >
        <Tab key='images' title='Images' className=''>
          <div className=''>
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
