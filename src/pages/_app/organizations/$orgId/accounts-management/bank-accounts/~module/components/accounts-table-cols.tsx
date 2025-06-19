import { BankAccount } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';

export const bankTableColumns: ColumnDef<BankAccount>[] = [
	{
		accessorKey: 'bankName',
		header: 'Bank Name',
		cell: ({ row }) => {
			return (
				<div>
					<p className='font-medium'>{row.original?.bankName}</p>
					<p className='text-sm text-teal-300'>[{row?.original?.reference}]</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'balance',
		header: 'Balance',
		cell: ({ row }) => {
			return <span>{row.original?.balance || 0.0} BDT</span>;
		},
	},
	{
		accessorKey: 'holderName',
		header: 'Holder Name',
	},
	{
		accessorKey: 'branch',
		header: 'Branch Name',
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
