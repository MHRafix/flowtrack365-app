import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { Unit, UnitPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { unitApi } from './~module/api/unitApi';
import { unitTableColumns } from './~module/components/unit-table-cols';
import { UnitForm } from './~module/components/UnitForm';
import { All_Units_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/units/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [unit, setUnit] = useState<Unit | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const { show } = useAppConfirm();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['unit-query'],
		queryFn: () =>
			gqlRequest<{ units: UnitPagination }>({
				query: All_Units_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
				},
			}),
	});

	const { removeUnit } = unitApi(() => refetch());

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Units</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setUnit(null);
					}}
				>
					<Plus /> Add Brand
				</Button>
			</div>
			<DataTable
				columns={unitTableColumns}
				data={
					data?.units?.nodes?.map((unit) => ({
						...unit,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setUnit(row);
							}}
						>
							<PenSquare /> Edit
						</Button>

						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id!);
								show({
									title: 'Are you sure to remove unit ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeUnit.mutate({
											id: row?._id!,
											orgUid: session?.orgUID!,
										});
									},
								});
							}}
							disabled={removeUnit?.isPending}
						>
							{removeUnit?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>
			<DrawerWrapper
				title={'Add Unit'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setUnit(null);
				}}
			>
				<UnitForm
					actionType='ADD'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setUnit(null);
					}}
				/>
			</DrawerWrapper>

			<DrawerWrapper
				title={'Edit Unit'}
				isOpen={isOpenEditDrawer}
				onCloseDrawer={() => {
					setOpenEditDrawer(false);
					setUnit(null);
				}}
			>
				<UnitForm
					actionType='EDIT'
					onRefetch={() => {
						refetch();
					}}
					unit={unit!}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setUnit(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
