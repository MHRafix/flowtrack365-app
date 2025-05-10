import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
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
import { IExpense, IExpenseCategory } from '@/types/expenseType';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2, PenSquare, Plus } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { expenseApi } from '../api/expenseApi';

interface ExpenseFormPropsType {
	expense?: IExpense;
	expenseCategories: IExpenseCategory[];
	actionType: 'ADD' | 'EDIT';
}
export const ExpenseForm: FC<ExpenseFormPropsType> = ({
	expense,
	expenseCategories,
	actionType,
}) => {
	const { createExpense, updateExpense } = expenseApi();

	// Define your form.
	const form = useForm<ExpenseFormStateType>({
		resolver: yupResolver(Expense_Form_Schema),
	});

	useEffect(() => {
		form.setValue('title', expense?.title!);
		form.setValue('category', expense?.category?._id!);
		form.setValue('amount', expense?.amount!);
	}, [expense]);

	// Define a submit handler.
	function onSubmit(values: ExpenseFormStateType) {
		actionType === 'ADD'
			? createExpense.mutate(values)
			: updateExpense.mutate({ _id: expense?._id!, ...values });
	}
	return (
		<DrawerWrapper
			title={actionType === 'ADD' ? 'Add Expense' : 'Edit Expense'}
			triggerButton={
				<Button variant={'outline'}>
					{actionType === 'ADD' ? <Plus /> : <PenSquare />}{' '}
					{actionType === 'ADD' ? 'Add Expense' : 'Edit'}
				</Button>
			}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
									<Input
										type='number'
										placeholder='Expense amount'
										{...field}
									/>
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
										defaultValue={expense?.category?._id}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{expenseCategories?.map(
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

					{/* <FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Description'
										onChange={field.onChange}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/> */}
					<Button type='submit' variant={'default'} className='w-full'>
						{createExpense?.isPending ||
							(updateExpense?.isPending && (
								<Loader2 className='animate-spin' />
							))}
						Save
					</Button>
				</form>
			</Form>
		</DrawerWrapper>
	);
};

const Expense_Form_Schema = Yup.object({
	title: Yup.string().required().label('Title'),
	category: Yup.string().required().label('Category'),
	amount: Yup.number().required().label('Amount'),
	// description: Yup.string().nullable().label('Description'),
});

export type ExpenseFormStateType = Yup.InferType<typeof Expense_Form_Schema>;
