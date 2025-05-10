import { StorageUtil } from '@/lib/storage.util';
import { fetchME } from '@/store/auth.atom';
import { useRouter } from '@tanstack/react-router';
import { LogOutIcon } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { useAppConfirm } from './AppConfirm';
import AppSidenav from './AppSideNav';
import { ModeToggler } from './ModeToggler';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

const DashboardScaffold: React.FC<PropsWithChildren> = ({ children }) => {
	const appConfirmHandle = useAppConfirm();
	const router = useRouter();
	return (
		<>
			<SidebarProvider defaultOpen={true}>
				<AppSidenav />
				<SidebarInset>
					<header className='dark:bg-[#172031] bg-[#FBFBFB] border-b !py-8 flex h-20 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-4'>
						<div className='flex items-center px-4 gap-2'>
							<SidebarTrigger className='-ml-1 text-2xl' />
							<Separator orientation='vertical' className='h-4 mr-2' />
						</div>

						<div className='flex pt-0 items-center gap-2'>
							{/* <ThemeSwitcherButton /> */}
							{/* User Button */}
							<ModeToggler />{' '}
							<Button
								variant={'ghost'}
								onClick={() => {
									appConfirmHandle.show({
										title: 'Logout',
										onConfirm: async () => {
											StorageUtil.removeItem('accessToken');
											StorageUtil.removeItem('refreshToken');
											await fetchME();
											router.invalidate();
										},
									});
								}}
							>
								<LogOutIcon />
								Logout
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>
											{/* {auth.user?.name?.slice(0, 2)} */}
											MH
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Settings</DropdownMenuItem>
									<DropdownMenuItem>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>
					<div className='flex flex-col flex-1 p-4 gap-4'>
						<>{children}</>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default DashboardScaffold;
