import { StorageUtil } from '@/lib/storage.util';
import { fetchME } from '@/store/auth.atom';
import { LogOutIcon } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { useAppConfirm } from '../AppConfirm';
import { ModeToggler } from '../ModeToggler';
import { Button } from '../ui/button';

const OrganizationLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const appConfirmHandle = useAppConfirm();
	return (
		<>
			<header className='dark:bg-[#172031] bg-[#FBFBFB] border-b !py-8 flex h-20 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4'>
				<div className='container mx-auto w-full flex justify-between pt-0 items-center gap-2'>
					<h1 className='text-xl md:text-2xl font-semibold'>FlowTrack365</h1>{' '}
					<div className='flex items-center gap-2 md:gap-5'>
						<ModeToggler />{' '}
						<Button
							variant={'outline'}
							onClick={() => {
								appConfirmHandle.show({
									title: 'Logout',
									onConfirm: async () => {
										StorageUtil.removeItem('token');
										StorageUtil.removeItem('orgUID');
										await fetchME();
										location.href = '/auth/login';
									},
								});
							}}
							className='!cursor-pointer text-red-500 hover:text-red-500'
						>
							<LogOutIcon />
							Logout
						</Button>
					</div>
				</div>
			</header>
			<div className='flex flex-col flex-1 p-4 gap-4'>
				<>{children}</>
			</div>
		</>
	);
};

export default OrganizationLayout;
