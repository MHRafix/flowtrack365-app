import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { BankAccount, BankAccountPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { bankTableColumns } from './~module/components/accounts-table-cols';
import { Bank_Accounts_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/accounts-management/bank-accounts/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
	const [rowId, setRowId] = useState<string>('');

	const { show } = useAppConfirm();

	const [session] = useAtom(userAtom);

	// savings
	const { data: bankAccounts, refetch } = useQuery({
		queryKey: [`bank-accounts`],
		queryFn: async () =>
			await gqlRequest<{
				bankAccounts: BankAccountPagination | null;
			}>({
				query: Bank_Accounts_Query,
				variables: {
					input: {
						page: 1,
						limit: 1000,
						sort: 'DESC',
						sortBy: 'createdAt',
					},
					orgUid: session?.orgUID,
				},
			}),
	});

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>Bank Accounts</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setBankAccount(null);
					}}
				>
					<Plus /> New Accounts
				</Button>
			</div>
			<DataTable
				columns={bankTableColumns}
				data={
					bankAccounts?.bankAccounts?.nodes?.map((bankAccount) => ({
						...bankAccount,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setBankAccount(row);
							}}
						>
							<PenSquare /> Edit
						</Button>

						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id!);
								show({
									title: 'Are you sure to remove expense ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										// removeExpense.mutate(row?._id);
									},
								});
							}}
							// disabled={removeExpense?.isPending}
						>
							{/* {removeExpense?.isPending && row?._id === rowId && ( */}
							{/* <Loader2 className='animate-spin' /> */}
							{/* )} */}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>
		</div>
	);
}
