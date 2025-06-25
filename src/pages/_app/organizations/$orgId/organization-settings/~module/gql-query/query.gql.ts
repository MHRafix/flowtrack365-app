import { gql } from '@/lib/api-client';

export const Organization_BY_OrgUID_Query = gql`
	query OrganizationByUID($orgUid: String!) {
		organizationByUID(orgUID: $orgUid) {
			_id
			name
			tagline
			orgUID
			isVerified
			status
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
			settings {
				apiKey
				apiToken
			}
			createdAt
			updatedAt
		}
	}
`;

export const Update_Organization_Mutation = gql`
	mutation UpdateOrganization(
		$updatePayload: UpdateOrganizationInput!
		$orgUid: String!
	) {
		updateOrganization(updatePayload: $updatePayload, orgUID: $orgUid) {
			_id
		}
	}
`;
