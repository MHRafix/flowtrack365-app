import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountFormStateType } from '../components/BankAccountForm';
import {
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
		createBankAccount,
		updateBankAccount,
		removeBankAccount,
	};
};

interface BankAccountApiPayloadType extends BankAccountFormStateType {
	_id?: string;
	orgUID: string;
}
