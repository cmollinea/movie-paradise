'use client';
import { useVoteAverageContext } from '@/app/hooks/useVoteAverageContext';
import { Slider } from '@nextui-org/react';

export const VoteAverageSlider = () => {
  const { voteRange, setVoteRange } = useVoteAverageContext();

  return (
    <Slider
      label='Vote Average'
      step={0.5}
      maxValue={10}
      minValue={0}
      defaultValue={voteRange}
      onChange={(value) => setVoteRange(value as [number, number])}
      value={voteRange}
      showSteps={true}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      className='overflow-x-hidden'
      classNames={{
        base: 'max-w-md h-20',
        filler: 'bg-gradient-to-r from-secondary-400 to-primary-400',
        labelWrapper: 'mb-2',
        label: 'font-medium text-default-700 text-medium',
        value: 'font-medium text-default-500 text-small',
        thumb: [
          'transition-size',
          'bg-gradient-to-r from-secondary-400 to-primary-400',
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
            'before:bg-gradient-to-r before:from-secondary-400 before:to-primary-400'
          ],
          content: [
            'py-2 shadow-xl',
            'text-white bg-gradient-to-r from-secondary-400 to-primary-400'
          ]
        }
      }}
    />
  );
};
