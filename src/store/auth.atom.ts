import { gqlRequest } from '@/lib/api-client';
import {
	Login_User_Details_In_Employee_List_Query,
	Login_User_Details_Query,
} from '@/pages/auth/~module/gql-query/query.gql';
import { IEmployee } from '@/types/employeeType';
import { User } from '@/types/userType';
import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { jwtDecode } from 'jwt-decode';
import { jotaiStore } from '.';

export interface IAuthStore {
	isAuthenticated: boolean;
	isPending: boolean;
	isFetched: boolean;
	user: User | null;
	userEmployeeProfile: IEmployee | null;
	logout?: () => Promise<void>;
	orgUID: string | null;
}
export const userAtom = atomWithImmer<IAuthStore>({
	isAuthenticated: false,
	isPending: false,
	isFetched: false,
	user: null,
	userEmployeeProfile: null,
	orgUID: null,
});
export async function fetchME() {
	const token = localStorage.getItem('token'); // or however you're storing it

	try {
		const decoded: User = jwtDecode(token!);

		jotaiStore.set(userAtom, (draft) => {
			draft.isPending = true;
		});

		try {
			const data = await gqlRequest<{
				user: User | null;
			}>({
				query: Login_User_Details_Query,
				variables: {
					input: {
						key: 'email',
						operator: 'eq',
						value: decoded?.email,
					},
				},
			});

			// user employee profile data
			const userEmployeeProfileData = await gqlRequest<{
				Employee: IEmployee | null;
			}>({
				query: Login_User_Details_In_Employee_List_Query,
				variables: {
					input: {
						key: 'employeeDetails',
						operator: 'eq',
						value: data?.user?._id,
					},
				},
			});

			jotaiStore.set(userAtom, (draft) => {
				draft.user = data?.user || null;
				draft.userEmployeeProfile = userEmployeeProfileData?.Employee || null;
				draft.orgUID = localStorage.getItem('orgUID');
				draft.isAuthenticated = true;
				draft.isFetched = true;
			});

			return data;
		} catch {
			jotaiStore.set(userAtom, (draft) => {
				draft.user = null;
				draft.userEmployeeProfile = null;
				draft.orgUID = null;
				draft.isAuthenticated = false;
				draft.isFetched = true;
			});
		} finally {
			jotaiStore.set(userAtom, (draft) => {
				draft.isPending = false;
			});
		}
	} catch (error) {
		jotaiStore.set(userAtom, (draft) => {
			draft.user = null;
			draft.userEmployeeProfile = null;
			draft.orgUID = null;
			draft.isAuthenticated = false;
			draft.isFetched = true;
		});
	}
}

export function useAuth() {
	const [auth, setAuth] = useAtom(userAtom);
	return [auth, setAuth] as const;
}
