import { gql } from '@/lib/api-client';

export const Brands_Query = gql`
	query Brands($orgUid: String!, $input: BrandListQueryInput) {
		brands(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
				logo {
					bucket
					region
					key
					externalUrl
				}
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

export const Create_Brand_Mutation = gql`
	mutation CreateBrand($payload: CreateBrandInput!) {
		createBrand(payload: $payload)
	}
`;

export const Update_Brand_Mutation = gql`
	mutation UpdateBrand($payload: UpdateBrandInput!, $orgUid: String!) {
		updateBrand(payload: $payload, orgUID: $orgUid)
	}
`;

export const Remove_Brand_Mutation = gql`
	mutation RemoveBrand($id: String!, $orgUid: String!) {
		removeBrand(_id: $id, orgUID: $orgUid)
	}
`;
