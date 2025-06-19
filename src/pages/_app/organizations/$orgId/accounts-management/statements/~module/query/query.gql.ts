import { gql } from '@/lib/api-client';

export const Statements_Query = gql`
	query Adjustments($orgUid: String!, $account: String!) {
		adjustments(orgUID: $orgUid, account: $account) {
			nodes {
				_id
				account {
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
				type
				amount
				balance
				description
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
