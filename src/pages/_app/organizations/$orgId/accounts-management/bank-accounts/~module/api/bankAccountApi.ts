import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountFormStateType } from '../components/BankAccountForm';
import {
	Balance_Adjustment_Mutation,
	Create_Bank_Accounts_Mutation,
	Remove_Bank_Accounts_Mutation,
	Update_Bank_Accounts_Mutation,
} from '../gql-query/query.gql';

export const bankAccountApi = (onSuccess?: CallableFunction) => {
	const createBankAccount = useMutation({
		mutationFn: (payload: BankAccountApiPayloadType) =>
			gqlRequest({
				query: Create_Bank_Accounts_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Bank account creation has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to create bank account'),
	});

	const balanceAdjustment = useMutation({
		mutationFn: (payload: BalanceAdjustmentApiPayloadType) =>
			gqlRequest({
				query: Balance_Adjustment_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Balance adjustment creation has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to adjust balance'),
	});

	const updateBankAccount = useMutation({
		mutationFn: (payload: BankAccountApiPayloadType) =>
			gqlRequest({
				query: Update_Bank_Accounts_Mutation,
				variables: {
					payload,
				},
			}),

		onSuccess: () => {
			toast.success('Bank account update has been success');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to update bank account'),
	});

	const removeBankAccount = useMutation({
		mutationFn: (id: string) =>
			gqlRequest({
				query: Remove_Bank_Accounts_Mutation,
				variables: {
					id,
				},
			}),

		onSuccess: () => {
			onSuccess?.();
			toast.success('Bank account removed successfully!');
		},
		onError: () => {
			toast.error('Failed to remove bank account!');
		},
	});

	return {
		removeBankAccount,
		balanceAdjustment,
		createBankAccount,
		updateBankAccount,
	};
};

interface BankAccountApiPayloadType extends BankAccountFormStateType {
	_id?: string;
	orgUID: string;
}

interface BalanceAdjustmentApiPayloadType {
	account: string;
	amount: number;
	orgUID: string;
	type: 'Deposit' | 'Withdraw';
}
