import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { AdjustmentPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Download } from 'lucide-react';
import { statementTableColumns } from './~module/components/statements-table-cols';
import { Statements_Query } from './~module/query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/accounts-management/statements/$accountId'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const { accountId } = Route.useParams();

	const { data } = useQuery({
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

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>Bank Statements</h2>
				<Button>
					<Download /> Download PDF
				</Button>
			</div>
			<DataTable
				columns={statementTableColumns}
				data={
					data?.adjustments?.nodes?.map((statement) => ({
						...statement,
					})) || []
				}
			/>
		</div>
	);
}
