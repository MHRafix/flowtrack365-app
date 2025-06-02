import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import {
	IExpenseCategory,
	IExpenseCategoryListWithPagination,
} from '@/types/expenseCategoriesType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { expenseCategoryApi } from './~modlule/api/expenseCategory.api';
import { expenseCategoryTableColumns } from './~modlule/components/expense-category-table-cols';
import { ExpenseCategoryForm } from './~modlule/components/ExpenseCategoryForm';
import { All_Expense_Categories_List_Query } from './~modlule/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/expense-management/expense-categories/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [expense, setExpenseCategory] = useState<IExpenseCategory | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const { show } = useAppConfirm();

	const { data, refetch } = useQuery({
		queryKey: ['all-expenses-category-for-dropdown'],
		queryFn: async () =>
			await gqlRequest<{
				expenseCategories: IExpenseCategoryListWithPagination | null;
			}>({
				query: All_Expense_Categories_List_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
					// "input": null
				},
			}),
	});

	const { removeExpenseCategory } = expenseCategoryApi(refetch);

	return (
		<div className='my-5'>
			<DrawerWrapper
				title={'Add Expense Category'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setExpenseCategory(null);
				}}
			>
				<ExpenseCategoryForm
					actionType='ADD'
					onRefetch={refetch}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setExpenseCategory(null);
					}}
				/>
			</DrawerWrapper>
			<div className='flex justify-between items-center gap-5 mb-5 '>
				<h2 className='text-2xl font-bold'>All Expenses Categories</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setExpenseCategory(null);
					}}
				>
					<Plus /> Add Expense
				</Button>
			</div>
			<DataTable
				columns={expenseCategoryTableColumns}
				data={
					data?.expenseCategories?.nodes?.map((expense) => ({
						...expense,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setExpenseCategory(row);
							}}
						>
							<PenSquare /> Edit
						</Button>

						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpenseCategory.mutate(row?._id);
									},
								});
							}}
							disabled={removeExpenseCategory?.isPending}
						>
							{removeExpenseCategory?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>{' '}
			<DrawerWrapper
				title={'Edit Expense Category'}
				isOpen={isOpenEditDrawer}
				onCloseDrawer={() => {
					setOpenEditDrawer(false);
					setExpenseCategory(null);
				}}
			>
				<ExpenseCategoryForm
					expenseCategory={expense!}
					actionType='EDIT'
					onRefetch={refetch}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setExpenseCategory(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
