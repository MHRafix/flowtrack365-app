import { Adjustment } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';

export const statementTableColumns: ColumnDef<Adjustment>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => {
			return (
				<span className='text-teal-500 p-2 rounded-md font-semibold'>
					{formatDate(row.getValue('createdAt')) || 'N/A'}
				</span>
			);
		},
	},
	{
		accessorKey: 'account',
		header: 'Account',
		cell: ({ row }) => {
			return (
				<div>
					<p className='font-medium'>{row.original?.account?.bankName}</p>
					<p className='text-sm text-teal-500'>
						[{row?.original?.account?.reference}]
					</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'type',
		header: 'Action Type',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row }) => {
			return <span>{row.original?.amount || 0.0} BDT</span>;
		},
	},
	{
		accessorKey: 'balance',
		header: 'Balance',
		cell: ({ row }) => {
			return <span>{row.original?.balance || 0.0} BDT</span>;
		},
	},
];
