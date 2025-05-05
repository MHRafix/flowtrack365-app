import { gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoginFormStateType } from '../../login.lazy';
import { RegistrationFormStateType } from '../../registration.lazy';
import { VerifyMagicLoginFormStateType } from '../../verify-login.lazy';
import {
	Magic_Login_User_Mutation,
	Registration_User_Mutation,
	Verify_Magic_Login_Mutation,
} from '../gql-query/query.gql';

export const authApi = (onRedirect?: CallableFunction) => {
	const registrationMutation = useMutation({
		mutationFn: (payload: RegistrationFormStateType) =>
			gqlRequest({
				query: Registration_User_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Registration has been success');
			onRedirect?.();
		},
		onError: () => toast.error('Failed to register account'),
	});

	const loginMutation = useMutation({
		mutationFn: (payload: LoginFormStateType) =>
			gqlRequest({
				query: Magic_Login_User_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Login link has been sent to your mail.');
			// joinRequestsQuery.refetch();
		},
		onError: () => toast.error('Failed to login'),
	});

	const verifyMagicLoginMutation = useMutation({
		mutationFn: (payload: VerifyMagicLoginFormStateType) =>
			gqlRequest({
				query: Verify_Magic_Login_Mutation,
				variables: { payload },
			}),
		onSuccess: () => {
			toast.success('Login has been success.');
			onRedirect?.();
		},
		onError: () => {
			toast.error('Failed to verify.');
		},
	});
	return { registrationMutation, loginMutation, verifyMagicLoginMutation };
};
