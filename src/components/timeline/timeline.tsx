type Props = {
  children: React.ReactNode;
};
export const TimeLineWrapper = ({ children }: Props) => {
  return (
    <div>
      <h2 className='sr-only'>Steps</h2>

      <div className="relative after:absolute after:left-3 md:after:left-5 after:top-1 after:[content:''] after:w-[1px] md:after:w-[2px] after:h-full after:opacity-30 after:rounded-lg after:bg-slate-50">
        <ol className='relative z-10 flex flex-col justify-between text-sm font-medium gap-4 md:gap-6'>
          {children}
        </ol>
      </div>
    </div>
  );
};
