import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ExpenseCategoryFormStateType } from '../components/ExpenseCategoryForm';
import {
	Create_Expense_Category_Mutation,
	Remove_Expense_Category_Mutation,
	Update_Expense_Category_Mutation,
} from '../gql-query/query.gql';

export const expenseCategoryApi = (onSuccess?: CallableFunction) => {
	const createExpenseCategory = useMutation({
		mutationFn: (payload: ExpenseCategoryFormStateType) =>
			gqlRequest({
				query: Create_Expense_Category_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Expense category creation has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to create expense category'),
	});
	const updateExpenseCategory = useMutation({
		mutationFn: (payload: ExpenseCategoryUpdatePayloadType) =>
			gqlRequest({
				query: Update_Expense_Category_Mutation,
				variables: {
					payload: payload,
				},
			}),

		onSuccess: () => {
			toast.success('Expense category update has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to update expense category'),
	});

	const removeExpenseCategory = useMutation({
		mutationFn: (id: string) =>
			gqlRequest({
				query: Remove_Expense_Category_Mutation,
				variables: {
					input: {
						key: '_id',
						operator: 'eq',
						value: id,
					},
				},
			}),

		onSuccess: () => {
			onSuccess?.();
			toast.success('Expense category removed successfully!');
		},
		onError: () => {
			toast.error('Failed to remove expense category!');
		},
	});

	return {
		createExpenseCategory,
		updateExpenseCategory,
		removeExpenseCategory,
	};
};

interface ExpenseCategoryUpdatePayloadType
	extends ExpenseCategoryFormStateType {
	_id: string;
}
