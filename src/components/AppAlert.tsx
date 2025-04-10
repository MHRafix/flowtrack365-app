// modalContext.tsx
import { Button } from '@/components/ui/button';

import { DialogTitle } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { CheckIcon, InfoIcon, OctagonAlertIcon, XIcon } from 'lucide-react';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader } from './ui/dialog';

interface ModalOptions {
	title: string;
	description?: string;
	children?: React.ReactNode;
	type?: 'info' | 'warning' | 'error' | 'success';
	labels?: {
		cancel: string;
	};
}

interface ModalContextType {
	show: (options: ModalOptions) => void;
	closeModal: () => void;
}

const Context = createContext<ModalContextType | undefined>(undefined);

export function AppAlertProvider({ children }: { children: React.ReactNode }) {
	const [modalContent, setModalContent] = useState<ModalOptions | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openConfirmModal = useCallback((options: ModalOptions) => {
		setModalContent(options);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setModalContent(null);
	}, []);

	const renderIcon = () => {
		switch (modalContent?.type) {
			case 'error':
				return (
					<XIcon className='size-16 bg-destructive text-white p-1 rounded-full' />
				);
			case 'warning':
				return (
					<OctagonAlertIcon className='size-16 bg-yellow-500 text-white p-1 rounded-full' />
				);
			case 'success':
				return (
					<CheckIcon className='size-16 bg-green-500 text-white p-1 rounded-full' />
				);
			case 'info':
				return (
					<InfoIcon className='size-16 bg-blue-500 text-white p-1 rounded-full' />
				);
			default:
				return (
					<XIcon className='size-16 bg-destructive text-white p-1 rounded-full' />
				);
		}
	};

	return (
		<Context.Provider value={{ show: openConfirmModal, closeModal }}>
			{children}
			{modalContent && (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogContent aria-describedby={undefined}>
						<DialogHeader>
							<DialogTitle className='hidden'>app-alert</DialogTitle>
							<div className='flex flex-col items-center gap-6'>
								<div
									className={clsx(
										'size-28 rounded-full grid place-items-center',
										{
											'bg-destructive/15': modalContent.type === 'error',
											'bg-yellow-500/15': modalContent.type === 'warning',
											'bg-green-500/15': modalContent.type === 'success',
											'bg-blue-500/15': modalContent.type === 'info',
										}
									)}
								>
									{renderIcon()}
								</div>

								<div className='flex flex-col gap-3 items-center'>
									<h3 className='font-semibold text-2xl'>
										{modalContent.title}
									</h3>
									{modalContent.description && (
										<p className='text-xl text-muted-foreground'>
											{modalContent.description}
										</p>
									)}
								</div>
								<DialogClose asChild>
									<Button variant={'secondary'}>
										{modalContent.labels?.cancel ?? 'Close'}
									</Button>
								</DialogClose>
							</div>
						</DialogHeader>
						{modalContent.children}
					</DialogContent>
				</Dialog>
			)}
		</Context.Provider>
	);
}

export function useAppAlert() {
	const context = useContext(Context);
	if (context === undefined) {
		throw new Error('useAppAlert must be used within a AppAlertProvider');
	}
	return context;
}

// Usage example:
/*
// In your app root
import { ModalProvider } from './modalContext';

function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  );
}

// In any component
import { useModals } from './modalContext';

function YourComponent() {
  const { openConfirmModal } = useModals();

  const handleClick = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      description: 'This action cannot be undone.',
      children: <p>Additional content goes here</p>,
      labels: { confirm: 'Proceed', cancel: 'Go back' },
      onCancel: () => console.log('Cancelled'),
      onConfirm: () => console.log('Confirmed'),
    });
  };

  return <Button onClick={handleClick}>Open Modal</Button>;
}
*/
