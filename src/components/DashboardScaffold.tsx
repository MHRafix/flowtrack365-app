import { gqlRequest } from '@/lib/api-client';
import { Organizations_List_Query } from '@/pages/auth/~module/gql-query/query.gql';
import { userAtom } from '@/store/auth.atom';
import { IOrganizationsWithPagination } from '@/types/organizationType';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { PropsWithChildren } from 'react';
import AppSidenav from './AppSideNav';
import { ModeToggler } from './ModeToggler';
import { OrganizationSwitcherDropdownBtn } from './OrganizationSwitcherButton';
import { Separator } from './ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Skeleton } from './ui/skeleton';

const DashboardScaffold: React.FC<PropsWithChildren> = ({ children }) => {
	const [session] = useAtom(userAtom);

	const { data: organizations, isLoading } = useQuery({
		queryKey: ['organizations-query'],
		queryFn: async () => {
			const res = await gqlRequest<{
				myOrganizations: IOrganizationsWithPagination | null;
			}>({
				query: Organizations_List_Query,
				variables: {
					input: {
						limit: 1000,
						page: 1,
					},
					id: session?.user?._id,
				},
			});

			return res?.myOrganizations?.nodes;
		},
	});
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
							{isLoading ? (
								<Skeleton className='h-[55px] w-[250px]' />
							) : (
								<>
									{!organizations?.length ? null : (
										<OrganizationSwitcherDropdownBtn
											organizations={organizations!}
										/>
									)}
								</>
							)}
							<ModeToggler />{' '}
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
