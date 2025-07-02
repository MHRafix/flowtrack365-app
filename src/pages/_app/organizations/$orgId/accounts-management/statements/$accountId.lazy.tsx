import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AdjustmentPagination, BankAccount, Organization } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Download } from 'lucide-react';
import { statementTableColumns } from './~module/components/statements-table-cols';
import {
	Organization_By_UID_Query,
	Single_Bank_Account_Details_Query,
	Statements_Query,
} from './~module/query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/accounts-management/statements/$accountId'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const { accountId } = Route.useParams();

	const { data, isLoading: statements_loading } = useQuery({
		queryKey: ['statements'],
		queryFn: () =>
			gqlRequest<{ adjustments: AdjustmentPagination }>({
				query: Statements_Query,
				variables: {
					orgUid: session?.orgUID,
					account: accountId,
					input: {
						limit: 10000,
						page: 1,
					},
				},
			}),
	});

	const { data: organization } = useQuery({
		queryKey: [`organization_${session?.orgUID}`],
		queryFn: async () => {
			const res = await gqlRequest<{
				organizationByUID: Organization | null;
			}>({
				query: Organization_By_UID_Query,
				variables: {
					orgUid: session?.orgUID,
				},
			});

			return res?.organizationByUID;
		},
	});

	const { data: bankAccountDetails, isLoading: bankAccountDetailsLoading } =
		useQuery({
			queryKey: [`bank_details_${accountId}`],
			queryFn: () =>
				gqlRequest<{ bankAccount: BankAccount }>({
					query: Single_Bank_Account_Details_Query,
					variables: {
						orgUid: session?.orgUID,
						id: accountId,
					},
				}),
		});

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='md:text-3xl text-xl font-bold'>Bank Statements</h2>
				<Button disabled={statements_loading}>
					<Download /> Download PDF
				</Button>
			</div>

			{bankAccountDetailsLoading ? (
				<Skeleton className='h-[300px] my-2 bg-slate-200 dark:bg-slate-800' />
			) : (
				<div className='my-5'>
					<div className='md:flex grid justify-left gap-5 py-5 my-2'>
						<img
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmiYHapAtv6Y2o_oNclqsqkpwkwi0O6Cr4A&s'
							alt='logo'
							className='rounded-md w-[130px] h-[130px] object-cover'
						/>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-semibold'>{organization?.name}</h1>
							<p className='text-xl text-teal-300'>{organization?.tagline}</p>
							<div className='text-left'>
								<h1 className='text-lg'>
									Email: {organization?.businessEmail}
								</h1>
								<h1 className='text-lg'>
									Phone: {organization?.businessPhone}
								</h1>
								<h1 className='text-lg'>Address: {organization?.address}</h1>
							</div>
						</div>
					</div>
					<hr />
					<div className='my-2 py-5'>
						<div className='text-left mx-auto'>
							<h1 className='text-lg font-medium'>
								Account Holder: {bankAccountDetails?.bankAccount?.holderName}
							</h1>{' '}
							<h1 className='text-lg font-medium'>
								Bank Name:{' '}
								{bankAccountDetails?.bankAccount?.bankName +
									' - ' +
									bankAccountDetails?.bankAccount?.reference}
							</h1>
							<h1 className='text-lg font-medium'>
								Branch: {bankAccountDetails?.bankAccount?.branch}
							</h1>{' '}
						</div>
					</div>
				</div>
			)}

			{statements_loading ? (
				<>
					{new Array(7).fill(7).map((_, idx) => (
						<Skeleton
							key={idx}
							className='h-[50px] my-2 bg-slate-200 dark:bg-slate-800'
						/>
					))}
				</>
			) : (
				<DataTable
					columns={statementTableColumns}
					data={
						data?.adjustments?.nodes?.map((statement) => ({
							...statement,
						})) || []
					}
				/>
			)}
		</div>
	);
}
