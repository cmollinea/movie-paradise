import { EpisodeSkelleton } from '../skelletons/episode-skelleton';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { ApiError } from '@/app/services';
import { EpisodeDetails } from 'root/types/episode-details';

type Props = {
  promise: Promise<ApiError | EpisodeDetails | undefined>;
};

export const EpisodeModal = async ({ promise }: Props) => {
  const episodeDetails = await promise;
  if (episodeDetails === undefined) {
    return <EpisodeSkelleton />;
  }

  if ('statusText' in episodeDetails) {
    return <EpisodeSkelleton />;
  }
  return (
    <Modal
      backdrop='opaque'
      isOpen
      radius='md'
      classNames={{
        body: 'py-6',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
        header: 'border-b-[1px] border-[#292f46]',
        footer: 'border-t-[1px] border-[#292f46]',
        closeButton: 'hover:bg-white/5 active:bg-white/10'
      }}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          {episodeDetails.name}
        </ModalHeader>
        <ModalBody>
          <p>{episodeDetails.overview}</p>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' variant='light'>
            Close
          </Button>
          <Button className='bg-[#6f4ef2] shadow-lg shadow-indigo-500/20'>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
