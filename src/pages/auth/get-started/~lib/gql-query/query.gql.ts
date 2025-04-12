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
