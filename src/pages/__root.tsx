import { jotaiStore } from '@/store';
import { fetchME, IAuthStore, userAtom } from '@/store/auth.atom';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface IRouteContext {
	auth: IAuthStore;
}

export const Route = createRootRouteWithContext<IRouteContext>()({
	beforeLoad: async (ctx) => {
		await fetchME();
		return { auth: jotaiStore.get(userAtom) };
	},
	component: () => (
		<>
			<Outlet />
			{!import.meta.env.PROD && <TanStackRouterDevtools />}
		</>
	),
	notFoundComponent: () => <div>404</div>,
});
