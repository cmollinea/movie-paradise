'use client';
import { Tables } from '@/hooks';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
type Props = {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant:
    | 'flat'
    | 'light'
    | 'solid'
    | 'bordered'
    | 'faded'
    | 'shadow'
    | 'ghost';
  action: (table: Tables) => Promise<void>;
  table: Tables;
  icon: React.ReactNode;
  label: string;
};

export const ActionButton = ({
  color,
  variant,
  action,
  table,
  icon,
  label
}: Props) => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const doAction = async () => {
    setBusy(true);
    await action(table);
    setBusy(false);
    router.refresh();
  };

  return (
    <Button disabled={busy} color={color} variant={variant} onClick={doAction}>
      {busy ? (
        'Working in background'
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </Button>
  );
};
