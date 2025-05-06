import { gqlRequest } from '@/lib/api-client';
import { User } from '@/types/userType';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoginFormStateType } from '../../login';
import { RegistrationFormStateType } from '../../registration';
import { VerifyMagicLoginFormStateType } from '../../verify-login';
import {
	Login_User_Details_Query,
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
		onSuccess: (res: any) => {
			localStorage.setItem('token', res?.verifyMagicLink?.data?.token);
			toast.success('Login has been success.');
			onRedirect?.();
		},
		onError: () => {
			toast.error('Failed to verify.');
		},
	});

	const loggedInUserDetails = useQuery({
		queryKey: ['logged-in-user'],
		queryFn: async () => {
			const res = await gqlRequest<{
				user: User | null;
			}>({
				query: Login_User_Details_Query,
			});
			return res?.user;
		},
	});
	return {
		registrationMutation,
		loginMutation,
		verifyMagicLoginMutation,
		loggedInUserDetails,
	};
};
