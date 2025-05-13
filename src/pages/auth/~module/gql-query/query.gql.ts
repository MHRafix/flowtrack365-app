import { gql } from '@/lib/api-client';

export const Registration_User_Mutation = gql`
	mutation Registration($input: RegistrationUserInput!) {
		registration(input: $input) {
			isSuccess
			message
			data
		}
	}
`;

export const Magic_Login_User_Mutation = gql`
	mutation MagicLogin($payload: MagicLinkAuthenticationInput!) {
		sendMagicLink(payload: $payload) {
			isSuccess
			message
		}
	}
`;
export const Verify_Magic_Login_Mutation = gql`
	mutation VerifyMagicLink($payload: VerifyMagicLinkInput!) {
		verifyMagicLink(payload: $payload) {
			isSuccess
			message
			data
		}
	}
`;

export const Login_User_Details_Query = gql`
	query User($input: CommonMatchInput!) {
		user(input: $input) {
			_id
			name
			email
			phone
			avatar
			role
		}
	}
`;

/**
 * organizations query
 * */

export const Organizations_List_Query = gql`
	query Organizations($input: OrganizationListQueryInput) {
		organizations(input: $input) {
			nodes {
				_id
				name
				tagline
				orgUID
				Logo {
					bucket
					region
					key
					externalUrl
				}
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
