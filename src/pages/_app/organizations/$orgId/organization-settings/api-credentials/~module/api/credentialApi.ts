import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
	Generate_Api_Key_Mutation,
	Generate_Api_Token_Mutation,
} from '../gql-query/query.gql';

export const credentialApi = (onSuccess?: CallableFunction) => {
	// generate api key
	const generateApiKey = useMutation({
		mutationKey: [`generateApiKey`],
		mutationFn: async (payload: CredentialApiPayload) =>
			await gqlRequest({
				query: Generate_Api_Key_Mutation,
				variables: payload,
			}),

		onSuccess: () => {
			toast.success('API Key has been generated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to generate API Key.');
		},
	});

	// generate api token
	const generateApiToken = useMutation({
		mutationKey: [`generateApiToken`],
		mutationFn: async (payload: CredentialApiPayload) =>
			await gqlRequest({
				query: Generate_Api_Token_Mutation,
				variables: payload,
			}),

		onSuccess: () => {
			toast.success('API Token has been generated successfully.');
			onSuccess?.();
		},
		onError: () => {
			toast.error('Failed to generate API Token.');
		},
	});

	return {
		generateApiKey,
		generateApiToken,
	};
};

export interface CredentialApiPayload {
	id: string;
	orgUid: string;
}
