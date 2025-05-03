import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoginFormStateType } from '../../login.lazy';
import { RegistrationFormStateType } from '../../registration.lazy';
import {
	Magic_Login_User_Mutation,
	Registration_User_Mutation,
} from '../gql-query/query.gql';

export const authApi = () => {
	const registrationMutation = useMutation({
		mutationFn: (payload: RegistrationFormStateType) =>
			gqlRequest({
				query: Registration_User_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Registration has been success');
			// joinRequestsQuery.refetch();
		},
		onError: () => toast.error('Failed to register account'),
	});

	const loginMutation = useMutation({
		mutationFn: (payload: LoginFormStateType) =>
			gqlRequest({
				query: Magic_Login_User_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Login has been success');
			// joinRequestsQuery.refetch();
		},
		onError: () => toast.error('Failed to login'),
	});
	return { registrationMutation, loginMutation };
};
