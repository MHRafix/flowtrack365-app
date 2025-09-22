import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { Order, OrderPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Info, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import OrderDetails from './~lib/components/OrderDetails';
import { ordersTableColumns } from './~lib/components/orders-table-cols';
import { All_Orders_By_Organization_Query } from './~lib/query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/orders-management/all-orders/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const [openDetails, setOpenDetails] = useState<boolean>(false);
	const [order, setOrder] = useState<Order | null>(null);

	const {
		data: orders,
		refetch,
		isRefetching,
	} = useQuery({
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
					// creatorId: session?.userEmployeeProfile?._id,
					orgUid: session?.orgUID,
				},
			}),
	});

	const totalMoneyOrdersOfToday = orders?.ordersByOrganization?.nodes
		?.reduce((acc, curr) => acc + curr.total, 0)
		.toFixed(2);

	return (
		<div>
			<DrawerWrapper
				title={'Order Details'}
				isOpen={openDetails}
				onCloseDrawer={() => {
					setOpenDetails(false);
					setOrder(null);
				}}
				size='full'
			>
				<OrderDetails order={order as Order} />
			</DrawerWrapper>
			<div className='grid gap-3 md:flex justify-between items-center bg-blue-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-blue-300 p-1 rounded-md'>Today's</span> Orders
				</h2>
				<div className='flex justify-between items-center gap-5'>
					<div className='text-xl font-semibold ml-auto bg-blue-300 p-1 rounded-md px-2'>
						<span>{totalMoneyOrdersOfToday || 0.0} BDT</span>
					</div>
					<Button
						onClick={() => refetch()}
						disabled={isRefetching}
						className='cursor-pointer'
					>
						<RefreshCcw className={isRefetching ? `animate-spin` : ''} />{' '}
						Refresh
					</Button>
				</div>
			</div>
			<DataTable
				columns={ordersTableColumns}
				data={
					orders?.ordersByOrganization?.nodes?.map((order) => ({
						...order,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenDetails(true);
								setOrder(row);
							}}
						>
							<Info /> Order Details
						</Button>
					</div>
				)}
			/>
		</div>
	);
}
