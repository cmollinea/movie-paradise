'use client';

import { Tab, Tabs as TabsRoot, Chip } from '@nextui-org/react';
import { useState } from 'react';
import { TabsKeys } from 'root/types/tabs-keys';
import { CardContainer, CardLink } from '../home';
import { Section } from '../global-ui';
import { FloatingButton } from './floating-button';

type Media =
  | {
      id: any;
      created_at: any;
      user_id: any;
      complete?: any;
      media: {
        id: any;
        title: any;
        overview: any;
        poster: any;
        media_type: any;
      }[];
    }[]
  | null;

type MediaObject = {
  id: any;
  title: any;
  overview: any;
  poster: any;
  media_type: any;
};

type Props = {
  favorites: Media;
  watchList: Media;
  completed: Media;
};

export const ProfileTabsContainer = ({
  favorites,
  watchList,
  completed
}: Props) => {
  const [selected, setSelected] = useState<TabsKeys>('favorites');

  return (
    <TabsRoot
      color='primary'
      variant='light'
      aria-label='Options'
      selectedKey={selected}
      onSelectionChange={(key) => setSelected(key as TabsKeys)}
      className='relative items-center place-content-center'
    >
      <Tab
        key='favorites'
        title={<Title label={'Favorites'} total={favorites?.length} />}
      >
        <Section>
          <CardContainer>
            {favorites &&
              favorites.map((fav) => {
                if (fav) {
                  const data = new Object(fav.media) as MediaObject;

                  const element = {
                    id: data.id as number,
                    name: data.title as string,
                    poster_path: data.poster as string
                  };
                  return (
                    <CardLink
                      key={element.id}
                      type={data.media_type}
                      imageSizes='poster'
                      element={element}
                    />
                  );
                }
              })}
          </CardContainer>
        </Section>
      </Tab>
      <Tab
        key='watchList'
        title={<Title label={'WatchList'} total={watchList?.length} />}
      >
        <Section>
          <CardContainer>
            {watchList &&
              watchList.map((wl) => {
                if (wl) {
                  const data = new Object(wl.media) as MediaObject;

                  const element = {
                    id: data.id as number,
                    name: data.title as string,
                    poster_path: data.poster as string
                  };

                  return (
                    <CardLink
                      key={element.id}
                      type={data.media_type}
                      imageSizes='poster'
                      element={element}
                    >
                      <FloatingButton id={wl.id} complete={wl.complete} />
                    </CardLink>
                  );
                }
              })}
          </CardContainer>
        </Section>
      </Tab>
      <Tab
        key='completed'
        title={<Title label={'Completed'} total={completed?.length} />}
      >
        <Section>
          <CardContainer>
            {completed &&
              completed.map((item) => {
                if (item) {
                  const data = new Object(item.media) as MediaObject;

                  const element = {
                    id: data.id as number,
                    name: data.title as string,
                    poster_path: data.poster as string
                  };
                  return (
                    <CardLink
                      key={element.id}
                      type={data.media_type}
                      imageSizes='poster'
                      element={element}
                    >
                      <FloatingButton id={item.id} complete={item.complete} />
                    </CardLink>
                  );
                }
              })}
          </CardContainer>
        </Section>
      </Tab>{' '}
    </TabsRoot>
  );
};

const Title = ({
  label,
  total = 0
}: {
  label: string;
  total: number | undefined;
}) => {
  return (
    <div className='flex items-center space-x-1'>
      <span>{label}</span>

      <Chip variant='flat' color='default' size='sm'>
        {total}
      </Chip>
    </div>
  );
};
