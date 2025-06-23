import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { Brand, BrandPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { brandApi } from './~module/api/brandApi';
import { BrandForm } from './~module/components/BrandForm';
import { brandTableColumns } from './~module/components/brands-table-cols';
import { Brands_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/brands/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [brand, setBrand] = useState<Brand | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const { show } = useAppConfirm();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['brand-query'],
		queryFn: () =>
			gqlRequest<{ brands: BrandPagination }>({
				query: Brands_Query,
				variables: {
					orgUid: session?.orgUID,
					input: {
						limit: 1000,
						page: 1,
					},
				},
			}),
	});

	const { removeBrand } = brandApi(() => refetch());

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Brands</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setBrand(null);
					}}
				>
					<Plus /> Add Brand
				</Button>
			</div>
			<DataTable
				columns={brandTableColumns}
				data={
					data?.brands?.nodes?.map((brand) => ({
						...brand,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setBrand(row);
							}}
						>
							<PenSquare /> Edit
						</Button>

						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id!);
								show({
									title: 'Are you sure to remove brand ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeBrand.mutate({
											id: row?._id!,
											orgUid: session?.orgUID!,
										});
									},
								});
							}}
							disabled={removeBrand?.isPending}
						>
							{removeBrand?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>
			<DrawerWrapper
				title={'Add Brand'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setBrand(null);
				}}
			>
				<BrandForm
					actionType='ADD'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setBrand(null);
					}}
				/>
			</DrawerWrapper>

			<DrawerWrapper
				title={'Edit Brand'}
				isOpen={isOpenEditDrawer}
				onCloseDrawer={() => {
					setOpenEditDrawer(false);
					setBrand(null);
				}}
			>
				<BrandForm
					actionType='EDIT'
					onRefetch={() => {
						refetch();
					}}
					brand={brand!}
					onCloseDrawer={() => {
						setOpenEditDrawer(false);
						setBrand(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
