import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { ApiError } from '@/services';
import { EpisodeDetails } from 'root/types/episode-details';
import OkButton from './ok-button';
import { EpisodeError } from '../error/episode-error';

type Props = {
  promise: Promise<ApiError | EpisodeDetails | undefined>;
};

export const EpisodeModal = async ({ promise }: Props) => {
  const episodeDetails = await promise;
  if (episodeDetails === undefined) {
    return <EpisodeError />;
  }

  if ('statusText' in episodeDetails) {
    return <EpisodeError />;
  }
  return (
    <Modal
      backdrop='blur'
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
          <OkButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
