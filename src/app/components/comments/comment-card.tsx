import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar
} from '@nextui-org/react';

type Props = {
  avatar_url: string;
  user_name: string;
  comment: string;
  created_at: Date;
};

export const CommentCard = ({
  avatar_url,
  user_name,
  comment,
  created_at
}: Props) => {
  return (
    <Card className='w-full'>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <Avatar isBordered radius='full' size='md' src={avatar_url} />
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              {user_name}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className='px-3 py-0 text-small text-default-400'>
        <p>{comment}</p>
      </CardBody>
      <CardFooter>
        <small>{created_at.toLocaleString()}</small>
      </CardFooter>
    </Card>
  );
};
