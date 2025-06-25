import { UpdateOrganizationInput } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { Update_Organization_Mutation } from '@/pages/_app/organizations/$orgId/organization-settings/~module/gql-query/query.gql';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { OrganizationFormStateType } from '../../create-organization';
import { Create_Organization_Mutation } from '../gql-query/query.gql';

export const organizationApi = (onRedirect?: CallableFunction) => {
	const createOrganizationMutation = useMutation({
		mutationFn: (payload: CreateOrganization) =>
			gqlRequest({
				query: Create_Organization_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Organization created success.');
			onRedirect?.();
		},
		onError: () => toast.error('Failed to create organization'),
	});

	const updateOrganization = useMutation({
		mutationFn: (payload: UpdateOrganizationInput) =>
			gqlRequest({
				query: Update_Organization_Mutation,
				variables: {
					updatePayload: payload,
					orgUid: payload?.orgUID,
				},
			}),
		onSuccess: () => {
			toast.success('Organization updated success.');
			onRedirect?.();
		},
		onError: () => toast.error('Failed to update organization'),
	});

	return {
		createOrganizationMutation,
		updateOrganization,
	};
};

interface CreateOrganization extends OrganizationFormStateType {
	owner: string;
	employees: string[];
}
