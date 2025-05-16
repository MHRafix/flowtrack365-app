import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { gqlRequest } from '@/lib/api-client';
import { formatDate } from '@/lib/formater.utils';
import { IExpense, IExpenseListWithPagination } from '@/types/expenseType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { expenseApi } from './~module/api/expenseApi';
import { expenseTableColumns } from './~module/components/expense-table-cols';
import { ExpenseForm } from './~module/components/ExpenseForm';
import { All_Expense_List_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/expense-management/all-expenses/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [expense, setExpense] = useState<IExpense | null>(null);
	const [rowId, setRowId] = useState<string>('');

	const { show } = useAppConfirm();
	const currentDate = new Date().toISOString().split('T')[0];
	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();

	// expense of today
	const { data: todaysExpenses, refetch } = useQuery({
		queryKey: [`all-expenses-${currentDate}`],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: {
							key: 'createdAt',
							operator: 'gte',
							value: currentDate,
						},
					},
				},
			}),
	});

	// today's total expense
	const totalExpenseOfToday = todaysExpenses?.expenseCalculationList?.nodes
		?.reduce((acc, curr) => acc + curr.amount, 0)
		.toFixed(2);

	// expenses of this month
	const { data: thisMonthExpenses, refetch: refetchMonthExpense } = useQuery({
		queryKey: [`all-expenses-${currentYear}-${currentMonth}`],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: {
							key: 'createdAt',
							operator: 'gte',
							value: `${currentYear}-${currentMonth}`,
						},
					},
				},
			}),
	});

	// this month total expense
	const totalExpenseOfThisMonth =
		thisMonthExpenses?.expenseCalculationList?.nodes
			?.reduce((acc, curr) => acc + curr.amount, 0)
			.toFixed(2);

	// annual expenses
	const { data: annualExpenses, refetch: refetchAnnualExpenses } = useQuery({
		queryKey: [`annual-expenses-${currentYear}-${currentMonth}`],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: {
							key: 'createdAt',
							operator: 'lte',
							value: `${currentYear}-${currentMonth}`,
						},
					},
				},
			}),
	});

	// annual total expense
	const totalExpenseAnnual = annualExpenses?.expenseCalculationList?.nodes
		?.reduce((acc, curr) => acc + curr.amount, 0)
		.toFixed(2);

	// remove expense
	const { removeExpense } = expenseApi(() => {
		refetch();
		refetchMonthExpense();
		refetchAnnualExpenses();
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
					onRefetch={() => {
						refetch();
						refetchMonthExpense();
						refetchAnnualExpenses();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setExpense(null);
					}}
				/>
			</DrawerWrapper>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Expenses</h2>
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

			<div className='flex justify-between items-center bg-blue-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-blue-300 p-1 rounded-md'>Today's</span> Expenses
				</h2>
				<h3 className='text-xl font-semibold'>
					<span className='bg-blue-300 p-1 rounded-md px-2'>
						{totalExpenseOfToday || 0.0} BDT
					</span>
				</h3>
			</div>
			<DataTable
				columns={expenseTableColumns}
				data={
					todaysExpenses?.expenseCalculationList?.nodes?.map((expense) => ({
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
							onClick={() => {
								setRowId(row?._id);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpense.mutate(row?._id);
									},
								});
							}}
							disabled={removeExpense?.isPending}
						>
							{removeExpense?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>

			<br />
			<br />

			<div className='flex justify-between items-center bg-orange-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-orange-300 p-1 rounded-md'>
						{formatDate(new Date().toISOString()).split(' ')[0]} -{' '}
						{formatDate(new Date().toISOString()).split(' ')[2]}
					</span>{' '}
					Expenses
				</h2>
				<h3 className='text-xl font-semibold'>
					<span className='bg-orange-300 p-1 rounded-md px-2'>
						{totalExpenseOfThisMonth || 0.0} BDT
					</span>
				</h3>
			</div>
			<DataTable
				columns={expenseTableColumns}
				data={
					thisMonthExpenses?.expenseCalculationList?.nodes?.map((expense) => ({
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
							onClick={() => {
								setRowId(row?._id);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpense.mutate(row?._id);
									},
								});
							}}
							disabled={removeExpense?.isPending}
						>
							{removeExpense?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>

			<br />
			<br />
			<div className='flex justify-between items-center bg-teal-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-teal-300 p-1 rounded-md'>
						{formatDate(new Date().toISOString()).split(' ')[2]} Annual
					</span>{' '}
					Expenses
				</h2>
				<h3 className='text-xl font-semibold'>
					<span className='bg-teal-300 p-1 rounded-md px-2'>
						{totalExpenseAnnual || 0.0} BDT
					</span>
				</h3>
			</div>
			<DataTable
				columns={expenseTableColumns}
				data={
					annualExpenses?.expenseCalculationList?.nodes?.map((expense) => ({
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
							onClick={() => {
								setRowId(row?._id);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeExpense.mutate(row?._id);
									},
								});
							}}
							disabled={removeExpense?.isPending}
						>
							{removeExpense?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>

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
					actionType='EDIT'
					onRefetch={() => {
						refetch();
						refetchMonthExpense();
						refetchAnnualExpenses();
					}}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setExpense(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
