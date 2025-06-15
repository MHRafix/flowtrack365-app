import { formatDate } from '@/lib/formater.utils';
import { IExpenseCategory } from '@/types/expenseCategoriesType';
import { ColumnDef } from '@tanstack/react-table';

export const expenseCategoryTableColumns: ColumnDef<IExpenseCategory>[] = [
	{
		accessorKey: 'title',
		header: 'Expense Title',
	},
	{
		accessorKey: 'description',
		header: 'Description',
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
