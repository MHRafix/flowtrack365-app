import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ExpenseFormStateType } from '../components/ExpenseForm';
import {
	Create_Expense_Mutation,
	Remove_Expense_Mutation,
	Update_Expense_Mutation,
} from '../gql-query/query.gql';

export const expenseApi = (onSuccess?: CallableFunction) => {
	const createExpense = useMutation({
		mutationFn: (payload: ExpenseApiPayloadType) =>
			gqlRequest({
				query: Create_Expense_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Expense creation has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to create expense'),
	});
	const updateExpense = useMutation({
		mutationFn: (payload: ExpenseApiPayloadType) =>
			gqlRequest({
				query: Update_Expense_Mutation,
				variables: {
					updateExpenseCalculationInput: payload,
				},
			}),

		onSuccess: () => {
			toast.success('Expense update has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to update expense'),
	});

	const removeExpense = useMutation({
		mutationFn: (id: string) =>
			gqlRequest({
				query: Remove_Expense_Mutation,
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
			toast.success('Expense removed successfully!');
		},
		onError: () => {
			toast.error('Failed to remove expense!');
		},
	});

	return {
		createExpense,
		updateExpense,
		removeExpense,
	};
};

interface ExpenseApiPayloadType extends ExpenseFormStateType {
	_id?: string;
	orgUID: string;
	creator: string;
}
