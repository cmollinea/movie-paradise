'use client';

import { filters } from '@/app/constants';
import { useSortByContext } from '@/app/hooks/useSortByContext';
import { Select, SelectItem } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export const sortStrings = [
  { value: 'popularity.asc', label: 'Popularity Asc' },
  { value: 'popularity.desc', label: 'Popularity Desc' },
  { value: 'revenue.asc', label: 'Revenue Asc' },
  { value: 'revenue.desc', label: 'Revenue Desc' },
  { value: 'primary_release_date.asc', label: 'Primary Release Date Asc' },
  { value: 'primary_release_date.desc', label: 'Primary Release Date Desc' },
  { value: 'vote_average.asc', label: 'Vote Average Asc' },
  { value: 'vote_average.desc', label: 'Vote Average Desc' },
  { value: 'vote_count.asc', label: 'Vote Count Asc' },
  { value: 'vote_count.desc', label: 'Vote Count Desc' }
];

export const SortSelect = () => {
  const { sortFilter, handleSelectSortFilter } = useSortByContext();

  return (
    <Select
      onChange={(e) => handleSelectSortFilter(e.target.value)}
      classNames={{
        trigger: 'bg-gray-100/10 border-gray-50/10',
        popoverContent: 'bg-foreground-800'
      }}
      label='Select a filter to sort by'
      variant='bordered'
      color='primary'
      defaultSelectedKeys={[sortFilter || sortStrings[0].value]}
    >
      {sortStrings.map((item) => (
        <SelectItem variant='shadow' key={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};
