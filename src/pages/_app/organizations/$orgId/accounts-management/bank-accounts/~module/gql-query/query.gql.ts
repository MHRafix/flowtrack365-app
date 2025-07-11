import { gql } from '@/lib/api-client';

export const Bank_Accounts_Query = gql`
	query BankAccounts($orgUid: String!, $input: BankAccountListQueryDto) {
		bankAccounts(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				bankName
				reference
				holderName
				branch
				balance
				orgUID
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;

export const Bank_Accounts_For_Dropdown_Query = gql`
	query BankAccounts($orgUid: String!, $input: BankAccountListQueryDto) {
		bankAccounts(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				bankName
				reference
			}
		}
	}
`;

export const Create_Bank_Accounts_Mutation = gql`
	mutation CreateBankAccount($payload: CreateBankAccountInput!) {
		createBankAccount(payload: $payload)
	}
`;

export const Balance_Adjustment_Mutation = gql`
	mutation CreateAdjustment($payload: CreateAdjustmentInput!) {
		createAdjustment(payload: $payload)
	}
`;

export const Update_Bank_Accounts_Mutation = gql`
	mutation UpdateBankAccount($payload: UpdateBankAccountInput!) {
		updateBankAccount(payload: $payload) {
			_id
		}
	}
`;

export const Remove_Bank_Accounts_Mutation = gql`
	mutation RemoveBankAccount($id: String!) {
		removeBankAccount(_id: $id) {
			_id
		}
	}
`;
