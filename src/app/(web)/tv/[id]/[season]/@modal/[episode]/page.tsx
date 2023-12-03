//todo hacer fetch al capitulo y mostrar el modal

type Props = {
  params: {
    id: string;
    season: string;
    episode: string;
  };
};
const Episode = async ({ params }: Props) => {
  const [id, season, episode] = [
    params.id,
    params.season.split('-')[1],
    params.episode.split('-')[1]
  ];
  return (
    <div className='fixed inset-0 bg-primary-500/20 z-[500]'>
      Tv ID: {id} <br />
      Season: {season} <br />
      episode: {episode}
    </div>
  );
};
export default Episode;
