import { RemoveAside } from '@/app/components/Test/remove-aside';
import { RemoveStyles } from '@/app/components/Test/remove-styles';
import { FilterAccordion } from '@/app/components/filters/filter-accordion';
import { FilterButton } from '@/app/components/filters/filter-button';
import { GenresWrapper } from '@/app/components/filters/genres-wrapper';
import { GenreFilterProvider } from '@/app/context/genre-filter-provider';
import { SortSelectProvider } from '@/app/context/sort-select-provider';
import { VoteAverageSliderProvider } from '@/app/context/vote-average-slider-provider';
import { VoteCountSliderProvider } from '@/app/context/vote-count-provider';
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
