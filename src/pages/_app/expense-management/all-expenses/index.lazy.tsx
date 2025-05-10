import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { gqlRequest } from '@/lib/api-client';
import { IExpenseCategoryListWithPagination } from '@/types/expenseCategoriesType';
import { IExpenseListWithPagination } from '@/types/expenseType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Trash } from 'lucide-react';
import { expenseTableColumns } from '../~module/components/expense-table-cols';
import { ExpenseForm } from '../~module/components/ExpenseForm';
import {
	All_Expense_Categories_List_Query,
	All_Expense_List_Query,
} from '../~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/expense-management/all-expenses/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ['all-expenses'],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				// variables: {
				// 	input: {
				// 		key: 'email',
				// 		operator: 'eq',
				// 		value: decoded?.email,
				// 	},
				// },
			}),
	});
	const { data: expenseCategories } = useQuery({
		queryKey: ['all-expenses-category'],
		queryFn: async () =>
			await gqlRequest<{
				expenseCategories: IExpenseCategoryListWithPagination | null;
			}>({
				query: All_Expense_Categories_List_Query,
				// variables: {
				// 	input: {
				// 		key: 'email',
				// 		operator: 'eq',
				// 		value: decoded?.email,
				// 	},
				// },
			}),
	});
	return (
		<div className='my-5'>
			<div className='flex justify-between items-center gap-5 mb-5 '>
				<h2 className='text-2xl font-bold'>All Expenses</h2>
				<ExpenseForm
					actionType='ADD'
					expenseCategories={expenseCategories?.expenseCategories?.nodes!}
				/>
			</div>
			<DataTable
				columns={expenseTableColumns}
				data={
					data?.expenseCalculationList?.nodes?.map((expense) => ({
						...expense,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<ExpenseForm
							expense={row!}
							expenseCategories={expenseCategories?.expenseCategories?.nodes!}
							actionType='EDIT'
						/>
						<Button variant={'destructive'}>
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>
		</div>
	);
}
