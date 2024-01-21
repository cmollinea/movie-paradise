'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { SortSelect } from './sort-select';
import { VoteAverageSlider } from './vote-average-slider';
import { VoteCountSlider } from './vote-count';

type Props = {
  children: React.ReactNode;
};

export const FilterAccordion = ({ children }: Props) => {
  return (
    <Accordion
      selectionMode='multiple'
      variant='splitted'
      defaultExpandedKeys={['2', '1']}
    >
      <AccordionItem
        className='text-base'
        key='1'
        aria-label='Sort by'
        title='Sort by'
      >
        <SortSelect />
      </AccordionItem>
      <AccordionItem
        className='text-base'
        key='2'
        aria-label='Genres'
        title='Genres'
      >
        {/* This is for retrieve genres server side */}
        <div>{children}</div>
      </AccordionItem>
      <AccordionItem
        className='text-base overflow-x-hidden h-fit flex flex-col space-y-4'
        key={'3'}
        aria-label='Others'
        title='Others'
      >
        <VoteAverageSlider />
        <VoteCountSlider />
      </AccordionItem>
    </Accordion>
  );
};
