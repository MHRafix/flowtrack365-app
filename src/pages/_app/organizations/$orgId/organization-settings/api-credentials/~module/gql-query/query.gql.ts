import { gql } from '@/lib/api-client';

export const Generate_Api_Key_Mutation = gql`
	mutation GenerateApiKey($id: String!, $orgUid: String!) {
		generateApiKey(_id: $id, orgUID: $orgUid)
	}
`;

export const Generate_Api_Token_Mutation = gql`
	mutation GenerateApiToken($id: String!, $orgUid: String!) {
		generateApiToken(_id: $id, orgUID: $orgUid)
	}
`;
