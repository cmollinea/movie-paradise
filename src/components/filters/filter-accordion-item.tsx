'use client';
import { AccordionItem } from '@nextui-org/react';

type Props = {
  label: string;
  children: React.ReactNode;
};

export const FilterAccordionItem = ({ label, children }: Props) => {
  return (
    <AccordionItem key={Math.random()} aria-label={label} title={label}>
      <>{children}</>
    </AccordionItem>
  );
};
