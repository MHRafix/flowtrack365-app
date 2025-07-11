import { Skeleton } from '@/components/ui/skeleton';
import { gqlRequest } from '@/lib/api-client';
import { getFileUrl } from '@/lib/getFileUrl';
import { userAtom } from '@/store/auth.atom';
import { IOrganizationsWithPagination } from '@/types/organizationType';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { Organizations_List_Query } from '../auth/~module/gql-query/query.gql';

export const Route = createFileRoute('/organizations/')({
	async beforeLoad(ctx) {
		if (ctx.context.auth.isFetched && !ctx.context.auth.isAuthenticated) {
			throw redirect({
				to: '/auth/login',
			});
		}
		return ctx;
	},
	pendingMinMs: 5000,
	pendingMs: 5000,
	shouldReload: true,
	component: RouteComponent,
});

function RouteComponent() {
	const [auth] = useAtom(userAtom);
	const { data, isLoading } = useQuery({
		queryKey: ['organizations-query'],
		queryFn: async () =>
			await gqlRequest<{
				myOrganizations: IOrganizationsWithPagination | null;
			}>({
				query: Organizations_List_Query,
				variables: {
					input: {
						limit: 1000,
						page: 1,
					},
					id: auth?.user?._id,
				},
			}),
	});
	return (
		<div className='flex sm:h-screen items-center justify-center bg-white dark:bg-slate-900 my-5'>
			<div className='w-full px-5 lg:px-0 lg:w-10/12 xl:w-9/12'>
				<h2 className='text-2xl font-semibold my-5'>Select Organizations</h2>
				<div className='w-full bg-slate-100 dark:bg-slate-800 p-6 rounded-sm'>
					<div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch'>
						<Link to='/organizations/create-organization'>
							<div className='h-[200px] sm:w-full  sm:h-full cursor-pointer dark:bg-slate-900 bg-slate-200 hover:bg-slate-200 hover:dark:bg-slate-900 hover:duration-500 rounded-md flex justify-center items-center'>
								<Plus size={40} />
							</div>
						</Link>
						{isLoading ? (
							<>
								{new Array(7).fill(7).map((_, idx) => (
									<Skeleton
										key={idx}
										className='h-[200px] bg-slate-200 dark:bg-slate-900'
									/>
								))}
							</>
						) : (
							<>
								{data?.myOrganizations?.nodes?.map(
									(organization, idx: number) => (
										<Link
											key={idx}
											to={'/organizations/$orgId'}
											params={{ orgId: organization?.orgUID }}
										>
											<div
												className='h-[200px] sm:h-full cursor-pointer dark:bg-slate-800 bg-slate-100 hover:dark:bg-slate-900 hover:bg-slate-200 hover:duration-300 rounded-md px-2 py-4 border'
												onClick={() => {
													localStorage.setItem('orgUID', organization?.orgUID);
													// jotaiStore.set(userAtom, (draft) => {
													// 	draft.orgUID = organization?.orgUID;
													// });
												}}
											>
												<img
													src={
														getFileUrl(organization?.Logo) ||
														'https://cdn-icons-png.flaticon.com/128/12192/12192153.png'
													}
													alt='organization icon'
													width={80}
													height={80}
													className='mx-auto'
												/>

												<h2 className='text-lg text-center my-2 font-bold'>
													{organization?.name || 'N/A'}
												</h2>
												<p className='text-center my-2 font-medium'>
													{organization?.orgUID}
												</p>
											</div>
										</Link>
									)
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
