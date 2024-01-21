import { RemoveAside } from '@/components/Test/remove-aside';
import { RemoveStyles } from '@/components/Test/remove-styles';
import {
  FilterAccordion,
  FilterButton,
  GenresWrapper
} from '@/components/filters';
import {
  GenreFilterProvider,
  SortSelectProvider,
  VoteAverageSliderProvider,
  VoteCountSliderProvider
} from '@/context';

import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

const MovieLayout = ({ children }: Props) => {
  return (
    <RemoveStyles>
      <RemoveAside>
        <aside className='w-full max-w-xs lg:sticky lg:top-20 h-fit'>
          <SortSelectProvider>
            <GenreFilterProvider>
              <VoteAverageSliderProvider>
                <VoteCountSliderProvider>
                  <FilterAccordion>
                    <Suspense fallback={<p>Loading...</p>}>
                      <GenresWrapper tmdbMediaType='movie' />
                    </Suspense>
                  </FilterAccordion>
                  <FilterButton />
                </VoteCountSliderProvider>
              </VoteAverageSliderProvider>
            </GenreFilterProvider>
          </SortSelectProvider>
        </aside>
      </RemoveAside>
      <div className='w-full'>{children}</div>
    </RemoveStyles>
  );
};
export default MovieLayout;
