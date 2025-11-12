import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { gql, gqlRequest } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Zap } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute(
	'/_app/organizations/$orgId/organization-settings/setup-meta/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [id, setId] = useState('');

	const connectMetaPixel = useMutation({
		mutationFn: () => gqlRequest({ query: gql``, variables: { id } }),
	});
	const onSubmit = (e: any) => {
		e.preventDefault();
		connectMetaPixel.mutate();
	};
	return (
		<div>
			<div className='my-5 bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
				<div className='flex items-center justify-between my-3'>
					<h1 className='text-xl font-medium'>Meta Pixel Setup</h1>
				</div>
				<form onSubmit={onSubmit} className='flex flex-wrap items-center gap-2'>
					<Input
						onChange={(e) => setId(e.target.value)}
						placeholder='Enter Pixel ID'
						required
					/>
					<Button size={'lg'}>
						<Zap /> Connect
					</Button>
				</form>
			</div>{' '}
		</div>
	);
}
