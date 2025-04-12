import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { RegistrationFormStateType } from '../../index.lazy';
import { Registration_User_Mutation } from '../gql-query/query.gql';

export const authApi = () => {
	const registrationMutation = useMutation({
		mutationFn: (payload: RegistrationFormStateType) =>
			gqlRequest({
				query: Registration_User_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Request has been approved successfully');
			// joinRequestsQuery.refetch();
		},
		onError: () => toast.error('Request failed to approve'),
	});
	return { registrationMutation };
};
