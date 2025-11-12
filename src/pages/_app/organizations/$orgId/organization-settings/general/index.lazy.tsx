import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Organization } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { organizationApi } from '@/pages/organizations/~module/api/organization.api';
import { userAtom } from '@/store/auth.atom';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Organization_BY_OrgUID_Query } from '../~module/gql-query/query.gql';
import OrganizationBasicInformation from './~module/components/OrganizationBasicInformation';
import OrganizationMedia from './~module/components/OrganizationMedia';
import SocialLinksForm from './~module/components/SocialLinksForm';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/organization-settings/general/'
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

	const { updateOrganization } = organizationApi(() =>
		organizationDetailsRefetch()
	);

	return (
		<div className='!w-full xl:!w-8/12 bg-slate-100 dark:bg-slate-800 p-2 lg:p-5 rounded-md'>
			{isLoading ? (
				<Skeleton className='h-[50px] w-[320px] rounded-md bg-slate-200 dark:bg-slate-900' />
			) : (
				<h1 className='text-2xl font-medium'>
					<span className='text-teal-500'>
						{data?.organizationByUID?.name}{' '}
					</span>
					- Organization General Settings
				</h1>
			)}
			<Tabs defaultValue='basic_information' className='mt-5 lg:w-full'>
				<TabsList className='w-full border grid grid-cols-2 lg:grid-cols-5 gap-3 h-auto'>
					<TabsTrigger value='basic_information'>Basic Information</TabsTrigger>
					<TabsTrigger value='logo_&_cover'>Logo & Cover</TabsTrigger>
					<TabsTrigger value='social_links'>Social Links</TabsTrigger>
				</TabsList>
				{isLoading ? (
					<Skeleton className='h-[400px] rounded-md bg-slate-200 dark:bg-slate-900' />
				) : (
					<div>
						<TabsContent value='basic_information'>
							<OrganizationBasicInformation
								organization={data?.organizationByUID!}
								updateOrganization={updateOrganization as UseMutationResult}
							/>
						</TabsContent>
						<TabsContent value='logo_&_cover'>
							<OrganizationMedia
								organization={data?.organizationByUID!}
								updateOrganization={updateOrganization as UseMutationResult}
							/>
						</TabsContent>
						<TabsContent value='social_links'>
							<SocialLinksForm
								organization={data?.organizationByUID!}
								updateOrganization={updateOrganization as UseMutationResult}
							/>
						</TabsContent>
					</div>
				)}
			</Tabs>
		</div>
	);
}
