'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';

import { ChevronDown, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

const icons = {
  chevron: <ChevronDown fill='currentColor' size={16} />,
  timer: <Clock className='text-warning' size={30} />,
  trending: (
    <TrendingUp className='text-secondary' fill='currentColor' size={30} />
  ),
  popular: <Sparkles className='text-primary' fill='currentColor' size={30} />
};

export function Navigation() {
  const router = useRouter();

  const goTo = (href: string) => {
    router.push(href);
  };

  return (
    <NavbarContent className='hidden sm:flex gap-4' justify='center'>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className='p-0 bg-transparent data-[hover=true]:bg-transparent'
              endContent={icons.chevron}
              radius='sm'
              variant='light'
            >
              Movies
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label='Movies'
          className='w-[340px]'
          itemClasses={{
            base: 'gap-4'
          }}
        >
          <DropdownItem
            onClick={() =>
              goTo(
                '/movies?sort_by=primary_release_date.desc&vote_count.gte=0&vote_average.gte=0&vote_average.lte=10'
              )
            }
            key='last_realases'
            description='Generate here a description'
            startContent={icons.timer}
          >
            Last Realases
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              goTo(
                '/movies?sort_by=vote_average.desc&vote_count.gte=1000&vote_average.gte=0&vote_average.lte=10'
              )
            }
            key='trending'
            description='Generate here a description'
            startContent={icons.trending}
          >
            Top Rated
          </DropdownItem>
          <DropdownItem
            onClick={() => goTo('/movies')}
            key='most_popular'
            description='Generate here a description'
            startContent={icons.popular}
          >
            Most Popular
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className='p-0 bg-transparent data-[hover=true]:bg-transparent'
              endContent={icons.chevron}
              radius='sm'
              variant='light'
            >
              Tv Shows
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label='ACME features'
          className='w-[340px]'
          itemClasses={{
            base: 'gap-4'
          }}
        >
          <DropdownItem
            onClick={() =>
              goTo(
                '/tv?sort_by=primary_release_date.desc&vote_count.gte=0&vote_average.gte=0&vote_average.lte=10'
              )
            }
            key='last_realases'
            description='Generate here a description'
            startContent={icons.timer}
          >
            Last Realases
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              goTo(
                '/movies?sort_by=vote_average.desc&vote_count.gte=1000&vote_average.gte=0&vote_average.lte=10'
              )
            }
            key='trending'
            description='Generate here a description'
            startContent={icons.trending}
          >
            Top Rated
          </DropdownItem>
          <DropdownItem
            onClick={() => goTo('/tv')}
            key='most_popular'
            description='Generate here a description'
            startContent={icons.popular}
          >
            Most Popular
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
