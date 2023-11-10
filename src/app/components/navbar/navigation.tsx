'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';

import {
  Activity,
  ChevronDown,
  Flashlight,
  Lock,
  Scale,
  Server,
  User
} from 'lucide-react';

const icons = {
  chevron: <ChevronDown fill='currentColor' size={16} />,
  scale: <Scale className='text-warning' fill='currentColor' size={30} />,
  lock: <Lock className='text-success' fill='currentColor' size={30} />,
  activity: (
    <Activity className='text-secondary' fill='currentColor' size={30} />
  ),
  flash: <Flashlight className='text-primary' fill='currentColor' size={30} />,
  server: <Server className='text-success' fill='currentColor' size={30} />,
  user: <User className='text-danger' fill='currentColor' size={30} />
};

export function Navigation() {
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
          aria-label='ACME features'
          className='w-[340px]'
          itemClasses={{
            base: 'gap-4'
          }}
        >
          <DropdownItem
            key='autoscaling'
            description='ACME scales apps to meet user demand, automagically, based on load.'
            startContent={icons.scale}
          >
            Last Realases
          </DropdownItem>
          <DropdownItem
            key='usage_metrics'
            description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
            startContent={icons.activity}
          >
            Trending
          </DropdownItem>
          <DropdownItem
            key='production_ready'
            description='ACME runs on ACME, join us and others serving requests at web scale.'
            startContent={icons.flash}
          >
            Most Popular
          </DropdownItem>
          <DropdownItem
            key='99_uptime'
            description='Applications stay on the grid with high availability and high uptime guarantees.'
            startContent={icons.server}
          >
            Explore
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
            key='autoscaling'
            description='ACME scales apps to meet user demand, automagically, based on load.'
            startContent={icons.scale}
          >
            Last Realases
          </DropdownItem>
          <DropdownItem
            key='usage_metrics'
            description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
            startContent={icons.activity}
          >
            Trending
          </DropdownItem>
          <DropdownItem
            key='production_ready'
            description='ACME runs on ACME, join us and others serving requests at web scale.'
            startContent={icons.flash}
          >
            Most Popular
          </DropdownItem>
          <DropdownItem
            key='99_uptime'
            description='Applications stay on the grid with high availability and high uptime guarantees.'
            startContent={icons.server}
          >
            Explore
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
