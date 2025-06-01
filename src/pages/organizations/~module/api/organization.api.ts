import { gqlRequest } from '@/lib/api-client';
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

	return {
		createOrganizationMutation,
	};
};

interface CreateOrganization extends OrganizationFormStateType {
	owner: string;
	employees: string[];
}
