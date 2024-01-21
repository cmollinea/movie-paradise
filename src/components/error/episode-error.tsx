import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import OkButton from '../episode-modal/ok-button';

export const EpisodeError = () => {
  return (
    <Modal
      closeButton={false}
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
        <ModalHeader>
          <p>There was an unexpected error</p>{' '}
        </ModalHeader>
        <ModalBody>
          <p>Please try again later.</p>
        </ModalBody>
        <ModalFooter>
          <OkButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
