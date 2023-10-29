type Props = {
  status: number;
  statusText: string;
};

function ErrorWithStatus({ status, statusText }: Props) {
  return <p>{`${status}: ${statusText}`}</p>;
}
export default ErrorWithStatus;
