type Props = {
  status: number;
  statusText: string;
};

export function ErrorWithStatus({ status, statusText }: Props) {
  return <p>{`${status}: ${statusText}`}</p>;
}
