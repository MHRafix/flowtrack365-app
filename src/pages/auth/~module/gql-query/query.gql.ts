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
			data
			isSuccess
			message
		}
	}
`;
