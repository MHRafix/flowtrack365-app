import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
	async beforeLoad(ctx) {
		if (ctx.context.auth.isFetched && ctx.context.auth.isAuthenticated) {
			throw redirect({
				to: '/organizations',
			});
		} else {
			throw redirect({
				to: '/auth/login',
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_app/"!</div>;
}
