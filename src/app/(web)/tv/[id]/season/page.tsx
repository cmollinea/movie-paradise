type Props = {
  params: {
    id: string;
  };
  searchParams: {
    number: string | undefined;
  };
};

function Season({ searchParams, params }: Props) {
  const seasonNumber = searchParams.number || '1';
  const showId = params.id;

  console.warn(`Showing season ${seasonNumber} of tv show ${showId}`);
  return <div>Hola</div>;
}
export default Season;
