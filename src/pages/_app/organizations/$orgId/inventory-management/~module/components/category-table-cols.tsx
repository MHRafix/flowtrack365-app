import { ProductCategory } from '@/gql/graphql';
import { formatDate } from '@/lib/formater.utils';
import { ColumnDef } from '@tanstack/react-table';

export const categoryTableColumns: ColumnDef<ProductCategory>[] = [
	{
		accessorKey: 'name',
		header: 'Category Name',
	},

	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			return <span>{row.original?.description || 'N/A'} BDT</span>;
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
