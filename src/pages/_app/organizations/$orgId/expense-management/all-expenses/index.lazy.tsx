import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Expense } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { formatDate } from '@/lib/formater.utils';
import { userAtom } from '@/store/auth.atom';
import { IExpenseCategoryListWithPagination } from '@/types/expenseCategoriesType';
import { IExpenseListWithPagination } from '@/types/expenseType';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
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
	'/_app/organizations/$orgId/expense-management/all-expenses/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [expense, setExpense] = useState<Expense | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const [session] = useAtom(userAtom);
	const [category, setCategory] = useState<null | string>(null);

	const { show } = useAppConfirm();
	const currentDate = new Date().toISOString().split('T')[0];
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();

	const { data: expenseCategories } = useQuery({
		queryKey: ['all-expenses-category-for-dropdown'],
		queryFn: async () =>
			await gqlRequest<{
				expenseCategories: IExpenseCategoryListWithPagination | null;
			}>({
				query: All_Expense_Categories_For_DropDown_List_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
				},
			}),
	});

	// expense of today adaddagit
	const { data: todaysExpenses, refetch } = useQuery({
		queryKey: [
			`all-expenses-${currentDate}`,
			currentYear,
			currentMonth,
			category,
		],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: getFilterQuery(category!, 'day'),
						sort: 'DESC',
						sortBy: 'createdAt',
					},
					creatorId: session?.userEmployeeProfile?._id,
					orgUid: session?.orgUID,
				},
			}),
	});

	// today's total expense
	const totalExpenseOfToday = todaysExpenses?.expenseCalculationList?.nodes
		?.reduce((acc, curr) => acc + curr.amount, 0)
		.toFixed(2);

	// expenses of this month
	const { data: thisMonthExpenses, refetch: refetchMonthExpense } = useQuery({
		queryKey: [
			`all-expenses-${currentYear}-${currentMonth}`,
			currentDate,
			category,
		],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: getFilterQuery(category!, 'month'),
						sort: 'DESC',
						sortBy: 'createdAt',
					},
					creatorId: session?.userEmployeeProfile?._id,
					orgUid: session?.orgUID,
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
		queryKey: [
			`annual-expenses-${currentYear}-${currentMonth}`,
			currentDate,
			category,
		],
		queryFn: async () =>
			await gqlRequest<{
				expenseCalculationList: IExpenseListWithPagination | null;
			}>({
				query: All_Expense_List_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						where: getFilterQuery(category!, 'annual'),
						sort: 'DESC',
						sortBy: 'createdAt',
					},
					creatorId: session?.userEmployeeProfile?._id,
					orgUid: session?.orgUID,
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
			<div className='md:flex grid justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Expenses</h2>
				<div className='flex items-center !justify-end gap-5'>
					<Select
						onValueChange={setCategory}
						defaultValue={expense?.category?._id!}
					>
						<SelectTrigger className='md:w-[250px] w-[140px]'>
							<SelectValue placeholder='Filter by category' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{expenseCategories?.expenseCategories?.nodes?.map(
									(expenseCategory, idx) => (
										<SelectItem value={expenseCategory?._id} key={idx}>
											{expenseCategory?.title}
										</SelectItem>
									)
								)}
							</SelectGroup>
						</SelectContent>
					</Select>{' '}
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
			</div>

			<div className='grid gap-3 md:flex justify-between items-center bg-blue-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-blue-300 p-1 rounded-md'>Today's</span> Expenses
				</h2>
				<div className='text-xl font-semibold ml-auto bg-blue-300 p-1 rounded-md px-2'>
					<span>{totalExpenseOfToday || 0.0} BDT</span>
				</div>
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
								setExpense(row as Expense);
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

			<div className='grid gap-3 md:flex justify-between items-center bg-orange-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-orange-300 p-1 rounded-md'>
						{formatDate(new Date().toISOString()).split(' ')[0]} -{' '}
						{formatDate(new Date().toISOString()).split(' ')[2]}
					</span>{' '}
					Expenses
				</h2>
				<div className='ml-auto text-xl font-semibold bg-orange-300 p-1 rounded-md px-2'>
					<span>{totalExpenseOfThisMonth || 0.0} BDT</span>
				</div>
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
								setExpense(row as Expense);
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
			<div className='grid gap-3 md:flex justify-between items-center bg-teal-200 text-black p-3 rounded-md mb-2'>
				<h2 className='text-xl font-semibold'>
					<span className='bg-teal-300 p-1 rounded-md'>
						{formatDate(new Date().toISOString()).split(' ')[2]} Annual
					</span>{' '}
					Expenses
				</h2>
				<div className='ml-auto text-xl font-semibold bg-teal-300 p-1 rounded-md px-2'>
					<span className=''>{totalExpenseAnnual || 0.0} BDT</span>
				</div>
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
								setExpense(row as Expense);
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

const getFilterQuery = (category: string, filterBy: string) => {
	const currentDate = new Date().toISOString().split('T')[0];
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();

	switch (filterBy) {
		case 'day':
			return category
				? [
						{
							key: 'createdAt',
							operator: 'gte',
							value: currentDate,
						},
						{
							key: 'category',
							operator: 'eq',
							value: category,
						},
					]
				: {
						key: 'createdAt',
						operator: 'gte',
						value: currentDate,
					};
		case 'month':
			return category
				? [
						{
							key: 'createdAt',
							operator: 'gte',
							value: `${currentYear}-${currentMonth}`,
						},
						{
							key: 'category',
							operator: 'eq',
							value: category,
						},
					]
				: {
						key: 'createdAt',
						operator: 'gte',
						value: `${currentYear}-${currentMonth}`,
					};

		case 'annual':
			return category
				? [
						{
							key: 'createdAt',
							operator: 'lte',
							value: `${currentYear}-${currentMonth}`,
						},
						{
							key: 'category',
							operator: 'eq',
							value: category,
						},
					]
				: {
						key: 'createdAt',
						operator: 'lte',
						value: `${currentYear}-${currentMonth}`,
					};

		default:
			break;
	}
};
