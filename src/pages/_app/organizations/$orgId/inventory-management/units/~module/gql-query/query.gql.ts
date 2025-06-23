import { gql } from '@/lib/api-client';

export const All_Units_Query = gql`
	query Units($orgUid: String!, $input: UnitListQueryInput) {
		units(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
				unitCode
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

export const Create_Unit_Mutation = gql`
	mutation CreateUnit($payload: CreateUnitInput!) {
		createUnit(payload: $payload)
	}
`;

export const Update_Unit_Mutation = gql`
	mutation UpdateUnit($payload: UpdateUnitInput!, $orgUid: String!) {
		updateUnit(payload: $payload, orgUID: $orgUid)
	}
`;

export const Remove_Unit_Mutation = gql`
	mutation RemoveUnit($id: String!, $orgUid: String!) {
		removeUnit(_id: $id, orgUID: $orgUid)
	}
`;
