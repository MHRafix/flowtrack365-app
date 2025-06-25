import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Organization } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2 } from 'lucide-react';
import { Organization_BY_OrgUID_Query } from '../~module/gql-query/query.gql';
import { credentialApi } from './~module/api/credentialApi';
import { CopyButton } from './~module/components/CopyButton';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/organization-settings/api-credentials/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);

	const {
		data,
		isLoading,
		refetch: organizationDetailsRefetch,
	} = useQuery({
		queryKey: [`product_details_${session?.orgUID}`],
		queryFn: () =>
			gqlRequest<{
				organizationByUID: Organization;
			}>({
				query: Organization_BY_OrgUID_Query,
				variables: {
					orgUid: session?.orgUID,
				},
			}),
		enabled: Boolean(session?.orgUID),
	});

	const { generateApiKey, generateApiToken } = credentialApi(() => {
		organizationDetailsRefetch();
	});

	return (
		<div className='!w-full xl:!w-8/12 bg-slate-100 dark:bg-slate-800 p-2 lg:p-5 rounded-md'>
			{isLoading ? (
				<Skeleton className='h-[50px] w-[320px] rounded-md bg-slate-200 dark:bg-slate-900' />
			) : (
				<h1 className='text-2xl font-medium'>
					<span className='text-teal-500'>
						{data?.organizationByUID?.name}{' '}
					</span>
					- API Credentials
				</h1>
			)}

			<br />

			<div className='my-5 bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-medium'>Organization API Key</h1>
					<Button
						onClick={() =>
							generateApiKey.mutate({
								id: data?.organizationByUID?._id!,
								orgUid: session?.orgUID!,
							})
						}
						disabled={generateApiKey.isPending}
					>
						{generateApiKey?.isPending && <Loader2 className='animate-spin' />}
						{data?.organizationByUID?.settings?.apiKey
							? 'Regenerate Key'
							: 'Generate Key'}
					</Button>
				</div>
				<br />

				<CopyButton text={data?.organizationByUID?.settings?.apiKey!} />
			</div>

			<div className='my-5 bg-neutral-100 border dark:bg-slate-900 p-5 rounded-md'>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-medium'>Organization API Token</h1>
					<Button
						onClick={() =>
							generateApiToken.mutate({
								id: data?.organizationByUID?._id!,
								orgUid: session?.orgUID!,
							})
						}
						disabled={generateApiToken.isPending}
					>
						{generateApiToken?.isPending && (
							<Loader2 className='animate-spin' />
						)}
						{data?.organizationByUID?.settings?.apiToken
							? 'Regenerate Token'
							: 'Generate Token'}
					</Button>
				</div>
				<br />
				<CopyButton text={data?.organizationByUID?.settings?.apiToken!} />
			</div>
		</div>
	);
}
