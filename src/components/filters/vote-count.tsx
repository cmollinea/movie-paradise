'use client';
import { useVoteCountContext } from '@/hooks/useVoteCountContext';
import { Slider } from '@nextui-org/react';

export const VoteCountSlider = () => {
  const { voteCount, setVoteCount } = useVoteCountContext();

  return (
    <Slider
      label='Min Vote Count'
      color='secondary'
      step={250}
      maxValue={3000}
      minValue={0}
      defaultValue={0}
      value={voteCount}
      onChange={(value) => setVoteCount(value as number)}
      showSteps={true}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      className='overflow-hidden'
      classNames={{
        base: 'max-w-md h-20',
        filler: 'bg-gradient-to-r from-secondary-400 to-primary-400',
        labelWrapper: 'mb-2',
        label: 'font-medium text-default-700 text-medium',
        value: 'font-medium text-default-500 text-small',
        thumb: [
          'transition-size',
          'bg-gradient-to-r from-secondary-400 to-primary-500',
          'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
          'data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6'
        ],
        step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50'
      }}
      tooltipProps={{
        offset: 10,
        placement: 'bottom',
        classNames: {
          base: [
            // arrow color
            'before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500'
          ],
          content: [
            'py-2 shadow-xl',
            'text-white bg-gradient-to-r from-secondary-400 to-primary-500'
          ]
        }
      }}
    />
  );
};
