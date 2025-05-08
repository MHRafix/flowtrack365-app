import { IExpense } from '@/types/expenseType';
import { ColumnDef } from '@tanstack/react-table';

export const expenseTableColumns: ColumnDef<IExpense>[] = [
	{
		accessorKey: 'title',
		header: 'Expense Title',
	},
	{
		accessorKey: 'amount',
		header: 'Expense Amount',
		cell: ({ row }) => {
			return <span>{row.original?.amount || 0.0} BDT</span>;
		},
	},
	{
		accessorKey: 'category.title',
		header: 'Category Title',
		cell: ({ row }) => {
			return <span>{row.original?.category?.title}</span>;
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
];
