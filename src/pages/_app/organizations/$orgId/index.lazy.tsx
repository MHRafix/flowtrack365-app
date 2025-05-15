import { userAtom } from '@/store/auth.atom';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';

export const Route = createLazyFileRoute('/_app/organizations/$orgId/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [user] = useAtom(userAtom);
	return (
		<div className='my-5 flex items-center justify-between'>
			<h3 className='text-2xl font-bold'>
				{user?.user?.email} Dashboard Pages
			</h3>
		</div>
	);
}
