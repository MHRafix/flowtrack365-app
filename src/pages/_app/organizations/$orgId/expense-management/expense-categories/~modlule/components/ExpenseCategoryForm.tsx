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
import { Textarea } from '@/components/ui/textarea';
import { IExpenseCategory } from '@/types/expenseCategoriesType';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { expenseCategoryApi } from '../api/expenseCategory.api';

interface ExpenseFormPropsType {
	expenseCategory?: IExpenseCategory;
	actionType: 'ADD' | 'EDIT';
	onRefetch: CallableFunction;
	onCloseDrawer: CallableFunction;
}
export const ExpenseCategoryForm: FC<ExpenseFormPropsType> = ({
	expenseCategory,
	actionType,
	onRefetch,
	onCloseDrawer,
}) => {
	const { createExpenseCategory, updateExpenseCategory } = expenseCategoryApi(
		() => {
			onRefetch();
			onCloseDrawer();
		}
	);

	// Define your form.
	const form = useForm<ExpenseCategoryFormStateType>({
		resolver: yupResolver(Expense_Category_Form_Schema),
	});

	useEffect(() => {
		form.setValue('title', expenseCategory?.title!);
		form.setValue('description', expenseCategory?.description!);
	}, [expenseCategory]);

	// Define a submit handler.
	function onSubmit(values: ExpenseCategoryFormStateType) {
		actionType === 'ADD'
			? createExpenseCategory.mutate(values)
			: updateExpenseCategory.mutate({ _id: expenseCategory?._id!, ...values });
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Expense category name' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Expense category description'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					variant={'default'}
					className='w-full'
					disabled={
						createExpenseCategory?.isPending || updateExpenseCategory?.isPending
					}
				>
					{(createExpenseCategory?.isPending ||
						updateExpenseCategory?.isPending) && (
						<Loader2 className='animate-spin' />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};

const Expense_Category_Form_Schema = Yup.object({
	title: Yup.string().required().label('Title'),
	description: Yup.string().required().label('Description'),
});

export type ExpenseCategoryFormStateType = Yup.InferType<
	typeof Expense_Category_Form_Schema
>;
