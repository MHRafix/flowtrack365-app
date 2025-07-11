import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { BankAccountPagination, Expense } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import {
	IExpenseCategory,
	IExpenseCategoryListWithPagination,
} from '@/types/expenseCategoriesType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Bank_Accounts_For_Dropdown_Query } from '../../../../accounts-management/bank-accounts/~module/gql-query/query.gql';
import { expenseApi } from '../api/expenseApi';
import { All_Expense_Categories_For_DropDown_List_Query } from '../gql-query/query.gql';

interface ExpenseFormPropsType {
	expense?: Expense;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const ExpenseForm: FC<ExpenseFormPropsType> = ({
	expense,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const [session] = useAtom(userAtom);

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

	const { data } = useQuery({
		queryKey: ['accounts-dropdown-list-in-expense'],
		queryFn: () =>
			gqlRequest<{ bankAccounts: BankAccountPagination }>({
				query: Bank_Accounts_For_Dropdown_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
				},
			}),
	});

	const { createExpense, updateExpense } = expenseApi(() => {
		onCloseDrawer();
		onRefetch();
	});

	// Define your form.
	const form = useForm<ExpenseFormStateType>({
		resolver: yupResolver(Expense_Form_Schema),
	});

	useEffect(() => {
		form.setValue('title', expense?.title!);
		form.setValue('category', expense?.category?._id!);
		form.setValue('amount', expense?.amount!);
		form.setValue('fromAccount', expense?.fromAccount?._id!);
	}, [expense]);

	// Define a submit handler.
	function onSubmit(values: ExpenseFormStateType) {
		actionType === 'ADD'
			? createExpense.mutate({
					...values,
					orgUID: session?.orgUID!,
					creator: session?.userEmployeeProfile?._id!,
				})
			: updateExpense.mutate({
					_id: expense?._id!,
					...values,
					orgUID: session?.orgUID!,
					creator: session?.userEmployeeProfile?._id!,
					statement: expense?.statement?._id!,
				});
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-5 !h-[600px] !overflow-auto'
			>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Expense name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input type='number' placeholder='Expense amount' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='category'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={expense?.category?._id!}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a category' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{expenseCategories?.expenseCategories?.nodes?.map(
												(expenseCategory: IExpenseCategory, idx: number) => (
													<SelectItem value={expenseCategory?._id} key={idx}>
														{expenseCategory?.title}
													</SelectItem>
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='fromAccount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Account</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={expense?.fromAccount?._id!}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a account' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{data?.bankAccounts?.nodes?.map((accountData, idx) => (
												<SelectItem value={accountData?._id!} key={idx}>
													<p className='font-medium'>{accountData?.bankName}</p>
													<p className='text-sm text-teal-400'>
														[{accountData?.reference}]
													</p>
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='createdAt'
					render={() => (
						<FormItem>
							<FormLabel>Created At</FormLabel>
							<FormControl>
								<Calendar
									mode='single'
									selected={form.watch('createdAt')}
									captionLayout='dropdown'
									onSelect={(date) => {
										form.setValue('createdAt', date!);
									}}
									className='block'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'default'} className='w-full'>
					{(createExpense?.isPending || updateExpense?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Expense_Form_Schema = Yup.object({
	title: Yup.string().required().label('Title'),
	category: Yup.string().required().label('Category'),
	fromAccount: Yup.string().required().label('Account'),
	amount: Yup.number().required().label('Amount'),
	createdAt: Yup.date().required().label('Date'),
	// description: Yup.string().nullable().label('Description'),
});

export type ExpenseFormStateType = Yup.InferType<typeof Expense_Form_Schema>;
