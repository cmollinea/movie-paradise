import { FilterAccordion } from '@/app/components/filters/filter-accordion';
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
    <section className='w-full p-4 flex items-center flex-col'>
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
              </VoteCountSliderProvider>
            </VoteAverageSliderProvider>
          </GenreFilterProvider>
        </SortSelectProvider>
      </aside>
      <div>{children}</div>
    </section>
  );
};
export default MovieLayout;
