import DashboardScaffold from '@/components/DashboardScaffold';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	async beforeLoad(ctx) {
		if (ctx.context.auth.isFetched && !ctx.context.auth.isAuthenticated) {
			throw redirect({
				to: '/auth/login',
			});
		}
		return ctx;
	},
	pendingMinMs: 5000,
	pendingMs: 5000,
	shouldReload: true,
	component: () => (
		<DashboardScaffold>
			<Outlet />
		</DashboardScaffold>
	),
});
