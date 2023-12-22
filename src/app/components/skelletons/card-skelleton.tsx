import { Card, CardFooter } from '@nextui-org/react';
import { CardContainer } from '../home';
let count = 0;
let arr: number[] = [];

while (count < 25) {
  arr.push(count);
  count++;
}

export const CardSkeleton = () => {
  return (
    <div className='flex-none transition-colors ease-in-out group'>
      <Card
        className='w-[120px] md:w-[154px] h-[180px] md:h-[231px] animate-pulse overflow-hidden flex flex-none max-sm:snap-center max-sm:snap-always'
        radius='md'
      >
        {' '}
        <CardFooter className='absolute bg-gradient-to-t from-black to-transparent rounded-none bottom-0 p-0 z-10 md:opacity-0 group-hover:opacity-100 transition-opacity ease-in-out'>
          <div className='bg-gradient-to-t from-black to-transparent w-full max-md:py-4 md:h-28 p-2 flex flex-col place-content-center'>
            <div className='animate-pulse'>
              <div className=' w-[100px] md:w-[120px] rounded-xl h-2 bg-gray-300/20' />
              <div className='flex space-x-2 items-center mt-2'>
                <span className='h-6 md:h-8 w-6 md:w-8 rounded-xl bg-gray-300/20  py-2' />
                <span className='h-6 md:h-8 w-10 md:w-12 rounded-xl bg-gray-300/20  py-2' />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const CardContainerSkelleton = () => {
  return (
    <CardContainer>
      {arr.map((item) => (
        <CardSkeleton key={item} />
      ))}
    </CardContainer>
  );
};
