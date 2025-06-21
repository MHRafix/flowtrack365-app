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

export const Single_Bank_Account_Details_Query = gql`
	query BankAccount($id: String!, $orgUid: String!) {
		bankAccount(_id: $id, orgUID: $orgUid) {
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
	}
`;

export const Organization_By_UID_Query = gql`
	query OrganizationByUID($orgUid: String!) {
		organizationByUID(orgUID: $orgUid) {
			_id
			name
			tagline
			orgUID
			businessEmail
			businessPhone
			address
			cover {
				bucket
				region
				key
				externalUrl
			}
			Logo {
				bucket
				region
				key
				externalUrl
			}
			createdAt
			updatedAt
		}
	}
`;
