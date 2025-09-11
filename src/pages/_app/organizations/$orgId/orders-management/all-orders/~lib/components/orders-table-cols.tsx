import { Badge } from '@/components/ui/badge';
import { Order } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
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
			return <Badge variant={'destructive'}>{row.original?.status}</Badge>;
		},
	},
	{
		accessorKey: 'payment?.status',
		header: 'Payment Status',
		cell: ({ row }) => {
			return (
				<Badge variant={'destructive'}>{row.original?.payment?.status}</Badge>
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
