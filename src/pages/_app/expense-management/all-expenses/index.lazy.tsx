import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { gqlRequest } from '@/lib/api-client';
import { IExpenseCategoryListWithPagination } from '@/types/expenseCategoriesType';
import { IExpense, IExpenseListWithPagination } from '@/types/expenseType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { expenseApi } from './~module/api/expenseApi';
import { expenseTableColumns } from './~module/components/expense-table-cols';
import { ExpenseForm } from './~module/components/ExpenseForm';
import {
	All_Expense_Categories_For_DropDown_List_Query,
	All_Expense_List_Query,
} from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/expense-management/all-expenses/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [expense, setExpense] = useState<IExpense | null>(null);

	const { show } = useAppConfirm();

	const { data, refetch } = useQuery({
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

	const { removeExpense } = expenseApi(refetch);

	const { data: expenseCategories } = useQuery({
		queryKey: ['all-expenses-category-for-dropdown'],
		queryFn: async () =>
			await gqlRequest<{
				expenseCategories: IExpenseCategoryListWithPagination | null;
			}>({
				query: All_Expense_Categories_For_DropDown_List_Query,
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
			<DrawerWrapper
				title={'Add Expense'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setExpense(null);
				}}
			>
				<ExpenseForm
					actionType='ADD'
					expenseCategories={expenseCategories?.expenseCategories?.nodes!}
					onRefetch={refetch}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setExpense(null);
					}}
				/>
			</DrawerWrapper>
			<div className='flex justify-between items-center gap-5 mb-5 '>
				<h2 className='text-2xl font-bold'>All Expenses</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setExpense(null);
					}}
				>
					<Plus /> Add Expense
				</Button>
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
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setExpense(row);
							}}
						>
							<PenSquare /> Edit
						</Button>

						<Button
							variant={'destructive'}
							onClick={() =>
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpense.mutate(row?._id);
									},
								})
							}
							disabled={removeExpense?.isPending}
						>
							{removeExpense?.isPending && <Loader2 className='animate-spin' />}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>{' '}
			<DrawerWrapper
				title={'Edit Expense'}
				isOpen={isOpenEditDrawer}
				onCloseDrawer={() => {
					setOpenEditDrawer(false);
					setExpense(null);
				}}
			>
				<ExpenseForm
					expense={expense!}
					expenseCategories={expenseCategories?.expenseCategories?.nodes!}
					actionType='EDIT'
					onRefetch={refetch}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setExpense(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
