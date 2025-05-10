import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ExpenseFormStateType } from '../components/ExpenseForm';
import {
	Create_Expense_Mutation,
	Update_Expense_Mutation,
} from '../gql-query/query.gql';

export const expenseApi = (onRedirect?: CallableFunction) => {
	const createExpense = useMutation({
		mutationFn: (payload: ExpenseFormStateType) =>
			gqlRequest({
				query: Create_Expense_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Expense creation has been success');
			onRedirect?.();
		},
		onError: () => toast.error('Failed to create expense'),
	});
	const updateExpense = useMutation({
		mutationFn: (payload: ExpenseUpdatePayloadType) =>
			gqlRequest({
				query: Update_Expense_Mutation,
				variables: {
					updateExpenseCalculationInput: payload,
				},
			}),

		onSuccess: () => {
			toast.success('Expense update has been success');
			onRedirect?.();
		},
		onError: () => toast.error('Failed to update expense'),
	});

	return {
		createExpense,
		updateExpense,
	};
};

interface ExpenseUpdatePayloadType extends ExpenseFormStateType {
	_id: string;
}
