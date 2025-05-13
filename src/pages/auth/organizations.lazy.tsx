import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { IOrganizationsWithPagination } from '@/types/organizationType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Grid, Plus } from 'lucide-react';
import { Organizations_List_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute('/auth/organizations')({
	component: RouteComponent,
});

function RouteComponent() {
	const [auth] = useAtom(userAtom);
	const { data, isLoading } = useQuery({
		queryKey: ['organizations-query'],
		queryFn: async () =>
			await gqlRequest<{
				organizations: IOrganizationsWithPagination | null;
			}>({
				query: Organizations_List_Query,
				variables: {
					input: {
						limit: 1000,
						page: 1,
						where: [
							{
								key: 'employees._id',
								operator: 'eq',
								value: auth?.user?._id,
							},
						],
					},
				},
			}),
	});
	return (
		<div className='flex h-screen items-center justify-center bg-white dark:bg-slate-900 my-5'>
			<div className='lg:w-8/12 '>
				<h2 className='text-2xl font-semibold my-5'>Select Organizations</h2>
				<div className='w-full bg-neutral-50 dark:bg-slate-800 p-6 rounded-sm'>
					<div className='w-full grid grid-cols-4 gap-5'>
						<div className='h-[180px] cursor-pointer bg-slate-200 hover:bg-slate-100 hover:duration-500 rounded-md flex justify-center items-center'>
							<Plus size={40} />
						</div>{' '}
						{isLoading ? 'Loading' : null}
						{data?.organizations?.nodes?.map((_, idx: number) => (
							<div
								key={idx}
								className='h-[180px] bg-neutral-200 rounded-md flex justify-center items-center'
							>
								<Grid />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
