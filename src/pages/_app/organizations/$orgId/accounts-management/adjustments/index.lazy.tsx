import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/accounts-management/adjustments/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>Transaction & Adjustments</h2>
			</div>
		</div>
	);
}
