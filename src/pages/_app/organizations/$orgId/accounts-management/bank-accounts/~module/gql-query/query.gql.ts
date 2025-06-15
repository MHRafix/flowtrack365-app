import { gql } from '@/lib/api-client';

export const Savings_Query = gql`
	query Savings($orgUid: String!, $input: SavingListQueryDto) {
		savings(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				title
				amount
				orgUID
				description
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
