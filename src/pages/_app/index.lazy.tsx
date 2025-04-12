import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='my-5 flex items-center justify-between'>
			<h3 className='text-2xl font-bold'>Dashboard Pages</h3>
		</div>
	);
}
