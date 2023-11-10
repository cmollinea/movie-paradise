type Props = {
  backgroundPath: string;
};

export function SearchForm({ backgroundPath }: Props) {
  return (
    <section
      className='min-h-[500px] w-[80%] bg-cover grid justify-center'
      style={{ backgroundImage: backgroundPath }}
    >
      <form>
        <input type='text' />
        <button>Search</button>
      </form>
    </section>
  );
}
