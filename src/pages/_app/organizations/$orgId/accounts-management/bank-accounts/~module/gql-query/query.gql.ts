import { gql } from '@/lib/api-client';

export const Bank_Accounts_Query = gql`
	query BankAccounts($orgUid: String!, $input: BankAccountListQueryDto) {
		bankAccounts(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				bankName
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
