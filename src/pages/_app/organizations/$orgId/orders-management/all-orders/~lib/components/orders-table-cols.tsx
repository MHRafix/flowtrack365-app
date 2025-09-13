import { Order, OrderStatus, PaymentStatus } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { OrderStatusBadge, PaymentStatusBadge } from '@/lib/StatusBadge';
import { ColumnDef } from '@tanstack/react-table';

export const ordersTableColumns: ColumnDef<Order>[] = [
	{
		accessorKey: 'billing.name',
		header: 'Customer Name',
	},
	{
		accessorKey: 'billing.phone',
		header: 'Customer Phone',
	},
	{
		accessorKey: 'billing.email',
		header: 'Customer Email',
		cell: ({ row }) => {
			return <span>{row.original?.billing?.email || 'N/A'} </span>;
		},
	},
	{
		accessorKey: 'billing.address',
		header: 'Customer Address',
		cell: ({ row }) => {
			return (
				<span>
					{row.original?.billing?.address +
						', ' +
						row.original?.billing?.district || 'N/A'}{' '}
				</span>
			);
		},
	},
	{
		accessorKey: 'total',
		header: 'Total Amount',
		cell: ({ row }) => {
			return <span>{row.original?.total || 0} BDT</span>;
		},
	},
	{
		accessorKey: 'status',
		header: 'Order Status',
		cell: ({ row }) => {
			return <OrderStatusBadge status={row.original?.status as OrderStatus} />;
		},
	},
	{
		accessorKey: 'payment?.status',
		header: 'Payment Status',
		cell: ({ row }) => {
			return (
				<PaymentStatusBadge
					status={row.original?.payment?.status as PaymentStatus}
				/>
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return (
				<span className='font-semibold'>
					{formatDate(row.getValue('createdAt')) || 'N/A'}
				</span>
			);
		},
	},
];
