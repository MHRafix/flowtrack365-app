import { CreateDailyActivityDto } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Create_Daily_Activity_Mutation } from '../gql-query/query';

export const activityApi = (onSuccess?: CallableFunction) => {
	const createDailyActivity = useMutation({
		mutationFn: (payload: CreateDailyActivityDto) =>
			gqlRequest({
				query: Create_Daily_Activity_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Daily activity created successfully');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to create daily activity'),
	});

	// const updateExpense = useMutation({
	// 	mutationFn: (payload: ExpenseApiPayloadType) =>
	// 		gqlRequest({
	// 			query: Update_Daily_Activity_Mutation,
	// 			variables: {
	// 				updateExpenseCalculationInput: payload,
	// 			},
	// 		}),

	// 	onSuccess: () => {
	// 		toast.success('Expense update has been success');
	// 		onSuccess?.();
	// 	},
	// 	onError: () => toast.error('Failed to update expense'),
	// });

	// const removeExpense = useMutation({
	// 	mutationFn: (id: string) =>
	// 		gqlRequest({
	// 			query: Remove_Expense_Mutation,
	// 			variables: {
	// 				input: {
	// 					key: '_id',
	// 					operator: 'eq',
	// 					value: id,
	// 				},
	// 			},
	// 		}),

	// 	onSuccess: () => {
	// 		onSuccess?.();
	// 		toast.success('Expense removed successfully!');
	// 	},
	// 	onError: () => {
	// 		toast.error('Failed to remove expense!');
	// 	},
	// });

	return {
		createDailyActivity,
		// updateExpense,
		// removeExpense,
	};
};

// interface ExpenseApiPayloadType extends ExpenseFormStateType {
// 	_id?: string;
// 	orgUID: string;
// 	creator: string;
// 	statement?: string;
// }
