import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BankAccount, BankAccountPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	ChartNoAxesCombined,
	EllipsisVertical,
	Loader2,
	PenSquare,
	Plus,
	Trash,
} from 'lucide-react';
import { useState } from 'react';
import { bankAccountApi } from './~module/api/bankAccountApi';
import { bankTableColumns } from './~module/components/accounts-table-cols';
import { AdjustmentForm } from './~module/components/AdjustmentForm';
import { BankAccountForm } from './~module/components/BankAccountForm';
import { Bank_Accounts_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/accounts-management/bank-accounts/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [isOpenAdjustmentDrawer, setOpenAdjustmentDrawer] =
		useState<boolean>(false);
	const [adjustmentType, setAdjustmentType] = useState<
		'Deposit' | 'Withdraw'
	>();
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
	const [accountId, setAccountId] = useState<string | null>(null);
	const [rowId, setRowId] = useState<string>('');

	const { show } = useAppConfirm();

	const [session] = useAtom(userAtom);

	const { removeBankAccount } = bankAccountApi(() => refetch());

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
			<DrawerWrapper
				title={'Create Account'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setBankAccount(null);
				}}
			>
				<BankAccountForm
					actionType='ADD'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setBankAccount(null);
					}}
				/>
			</DrawerWrapper>

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
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant={'outline'}>
									<EllipsisVertical />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									onClick={() => {
										setOpenAdjustmentDrawer(true);
										setAccountId(row?._id!);
										setAdjustmentType('Deposit');
									}}
								>
									<BanknoteArrowDown />
									Deposit
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setOpenAdjustmentDrawer(true);
										setAccountId(row?._id!);
										setAdjustmentType('Withdraw');
									}}
								>
									<BanknoteArrowUp />
									Withdraw
								</DropdownMenuItem>
								<DropdownMenuItem>
									<ChartNoAxesCombined /> Statements
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setOpenEditDrawer(true);
										setBankAccount(row);
									}}
								>
									<PenSquare /> Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										setRowId(row?._id!);
										show({
											title: 'Are you sure to remove expense ?',
											children: (
												<span>Please proceed to complete this action.</span>
											),
											onConfirm() {
												removeBankAccount.mutate(row?._id!);
											},
										});
									}}
									disabled={removeBankAccount?.isPending}
									variant='destructive'
								>
									{removeBankAccount?.isPending && row?._id === rowId && (
										<Loader2 className='animate-spin' />
									)}
									<Trash /> Remove
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* <Button variant={'outline'}>
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
										removeBankAccount.mutate(row?._id!);
									},
								});
							}}
							disabled={removeBankAccount?.isPending}
						>
							{removeBankAccount?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button> */}
					</div>
				)}
			/>
			<DrawerWrapper
				title={'Edit Bank Account'}
				isOpen={isOpenEditDrawer}
				onCloseDrawer={() => {
					setOpenEditDrawer(false);
					setBankAccount(null);
				}}
			>
				<BankAccountForm
					account={bankAccount!}
					actionType='EDIT'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setBankAccount(null);
					}}
				/>
			</DrawerWrapper>
			<DrawerWrapper
				title={`${adjustmentType} Balance`}
				isOpen={isOpenAdjustmentDrawer}
				onCloseDrawer={() => {
					setOpenAdjustmentDrawer(false);
				}}
			>
				<AdjustmentForm
					adjustmentType={adjustmentType!}
					account={accountId!}
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenAdjustmentDrawer(false);
						setAccountId(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
