import { DataTable } from '@/components/DataTable';
import { gqlRequest } from '@/lib/api-client';
import { IExpenseListWithPagination } from '@/types/expenseType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { expenseTableColumns } from './~module/components/expense-table-cols';
import { All_Expense_List_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute('/_app/expense-management/expenses/')({
	component: RouteComponent,
});

async function RouteComponent() {
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

	return (
		<div>
			<h1>All Expenses</h1>
			<DataTable
				columns={expenseTableColumns}
				data={
					data?.expenseCalculationList?.nodes?.map((expense) => ({
						...expense,
					})) || []
				}
			/>{' '}
		</div>
	);
}
