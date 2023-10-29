'use client';
import ReactPlayer from 'react-player/youtube';

type Props = {
  url: string;
};

function VideoPlayer({ url }: Props) {
  return (
    <div className='max-w-[400px] max-h-[200px] w-full h-full'>
      <ReactPlayer url={url} width={400} height={200} />
    </div>
  );
}
export default VideoPlayer;
