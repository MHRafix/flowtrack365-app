import { gql } from '@/lib/api-client';

export const Create_Organization_Mutation = gql`
	mutation CreateOrganization($payload: CreateOrganizationInput!) {
		createOrganization(payload: $payload) {
			_id
			name
			tagline
			orgUID
			businessEmail
			businessPhone
			address
		}
	}
`;
