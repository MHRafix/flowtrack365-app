import { DataTable } from '@/components/DataTable';
import { OrderPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { ordersTableColumns } from './~lib/components/orders-table-cols';
import { All_Orders_By_Organization_Query } from './~lib/query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/orders-management/all-orders/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const { data: orders } = useQuery({
		queryKey: [`all-orders`],
		queryFn: async () =>
			await gqlRequest<{
				ordersByOrganization: OrderPagination | null;
			}>({
				query: All_Orders_By_Organization_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						sort: 'DESC',
						sortBy: 'createdAt',
					},
					creatorId: session?.userEmployeeProfile?._id,
					orgUid: session?.orgUID,
				},
			}),
	});

	const totalMoneyOrdersOfToday = orders?.ordersByOrganization?.nodes
		?.reduce((acc, curr) => acc + curr.total, 0)
		.toFixed(2);

	return (
		<div>
			<div className='grid gap-3 md:flex justify-between items-center bg-blue-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-blue-300 p-1 rounded-md'>Today's</span> Orders
				</h2>
				<div className='text-xl font-semibold ml-auto bg-blue-300 p-1 rounded-md px-2'>
					<span>{totalMoneyOrdersOfToday || 0.0} BDT</span>
				</div>
			</div>
			<DataTable
				columns={ordersTableColumns}
				data={
					orders?.ordersByOrganization?.nodes?.map((order) => ({
						...order,
					})) || []
				}
				ActionCell={({}) => (
					<div className='flex gap-2'>
						{/* 
						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpense.mutate(row?._id);
									},
								});
							}}
							disabled={removeExpense?.isPending}
						>
							{removeExpense?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button> */}
					</div>
				)}
			/>
		</div>
	);
}
