import { gqlRequest } from '@/lib/api-client';
import { Login_User_Details_Query } from '@/pages/auth/~module/gql-query/query.gql';
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
	logout?: () => Promise<void>;
}
export const userAtom = atomWithImmer<IAuthStore>({
	isAuthenticated: false,
	isPending: false,
	isFetched: false,
	user: null,
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

			jotaiStore.set(userAtom, (draft) => {
				draft.user = data?.user || null;
				draft.isAuthenticated = true;
				draft.isFetched = true;
			});

			return data;
		} catch {
			jotaiStore.set(userAtom, (draft) => {
				draft.user = null;
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
			draft.isAuthenticated = false;
			draft.isFetched = true;
		});
	}
}

export function useAuth() {
	const [auth, setAuth] = useAtom(userAtom);
	return [auth, setAuth] as const;
}
