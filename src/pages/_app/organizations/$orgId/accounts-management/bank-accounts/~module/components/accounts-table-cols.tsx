import { Saving } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';

export const bankTableColumns: ColumnDef<Saving>[] = [
	{
		accessorKey: 'title',
		header: 'Bank Name',
	},
	{
		accessorKey: 'balance',
		header: 'Balance',
		cell: ({ row }) => {
			return <span>{row.original?.amount || 0.0} BDT</span>;
		},
	},
	{
		accessorKey: 'branch',
		header: 'Branch Name',
		cell: ({ row }) => {
			return <span>{row.original?.description || 'N/A'}</span>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			return (
				<span className='bg-teal-500 p-2 rounded-md font-semibold'>
					{formatDate(row.getValue('createdAt')) || 'N/A'}
				</span>
			);
		},
	},
];
