import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { jotaiStore } from '.';
import { IMeUser } from '@/types/commonModelTypes';
import { identityApi } from '@/lib/api-client';

export interface IAuthStore {
	isAuthenticated: boolean;
	isPending: boolean;
	isFetched: boolean;
	user: IMeUser | null;
	logout?: () => Promise<void>;
}
export const userAtom = atomWithImmer<IAuthStore>({
	isAuthenticated: false,
	isPending: false,
	isFetched: false,
	user: null,
});

export async function fetchME() {
	jotaiStore.set(userAtom, (draft) => {
		draft.isPending = true;
	});

	try {
		const data = await identityApi.get<IMeUser>('/users/me');

		jotaiStore.set(userAtom, (draft) => {
			draft.user = data?.data || null;
			draft.isAuthenticated = !!data;
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
}

export function useAuth() {
	const [auth, setAuth] = useAtom(userAtom);
	return [auth, setAuth] as const;
}
