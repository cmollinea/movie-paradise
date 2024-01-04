'use client';

import { Button } from '@nextui-org/react';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type Props = {
  biography: string;
};

export const PeopleBiography = ({ biography }: Props) => {
  const [showFullBiography, setShowFullBiography] = useState(false);
  const formattedString = biography.replace(/\n/g, '<br />');
  const splitedText = formattedString.split('<br />');
  console.log(splitedText);

  return (
    <div
      className={`grid md:mt-4 relative overflow-hidden gap-4 z-10 ${
        !showFullBiography &&
        splitedText.length > 3 &&
        'after:block after:bottom-10 after:top-[50%] after:absolute after:bg-gradient-to-t after:blur-[4px] after:w-full after:from-black after:to-transparent'
      }`}
    >
      <p
        className='text-sm md:text-lg transition-all ease-in-out'
        dangerouslySetInnerHTML={{
          __html:
            splitedText.length > 3 && showFullBiography === false
              ? splitedText.slice(0, 3).join('<br />')
              : formattedString
        }}
      />
      {splitedText.length > 3 && (
        <Button
          aria-label='Click me to see more info'
          onClick={() => setShowFullBiography((prev) => !prev)}
          size='sm'
          variant='ghost'
          color='primary'
          className='gap-0.5 place-self-end'
        >
          {showFullBiography ? <Minus size={14} /> : <Plus size={14} />}
        </Button>
      )}
    </div>
  );
};
