import DashboardScaffold from '@/components/DashboardScaffold';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	async beforeLoad(ctx) {
		// if (ctx.context.auth.isFetched && !ctx.context.auth.isAuthenticated) {
		// 	throw redirect({
		// 		to: '/auth/login',
		// 		search: {
		// 			redirect: ctx.location.pathname,
		// 		},
		// 	});
		// }
		return ctx;
	},
	component: () => (
		<DashboardScaffold>
			<Outlet />
		</DashboardScaffold>
	),
});
