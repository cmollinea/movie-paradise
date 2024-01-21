import { CardSkeleton } from './card-skelleton';

let count = 0;
let arr: number[] = [];

while (count < 25) {
  arr.push(count);
  count++;
}

export const DiscoverSkelleton = () => {
  return (
    <div className='flex flex-wrap gap-6 place-content-center mx-auto px-6'>
      {arr.map((item) => (
        <CardSkeleton key={item} />
      ))}
    </div>
  );
};
