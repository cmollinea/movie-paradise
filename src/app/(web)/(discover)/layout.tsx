import { RemoveAside } from '@/app/components/Test/remove-aside';
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
    <section className='w-full p-4 flex items-center flex-col py-16'>
      <RemoveAside>
        <aside className='w-full max-w-sm'>
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
      <div>{children}</div>
    </section>
  );
};
export default MovieLayout;
