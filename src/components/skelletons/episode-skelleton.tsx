import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';

export const EpisodeSkelleton = () => {
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
          <div className='flex flex-col gap-1 ml-2 w-40 h-6 animate-pulse bg-gray-300/10 rounded-xl' />
        </ModalHeader>
        <ModalBody>
          <div className='h-60 w-full animate-pulse bg-gray-300/10 rounded-xl' />
        </ModalBody>
        <ModalFooter>
          <div className='h-10 w-20 animate-pulse bg-gray-300/10 rounded-xl' />
          <div className='h-10 w-20 animate-pulse bg-gray-300/10 rounded-xl' />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
