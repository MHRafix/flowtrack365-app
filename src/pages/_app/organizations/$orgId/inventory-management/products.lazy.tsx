import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { Product, ProductPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { ProductForm } from './~module/components/ProductForm';
import { productsTableColumns } from './~module/components/products-table-cols';
import { All_Products_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [product, setProduct] = useState<Product | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const [session] = useAtom(userAtom);
	const { show } = useAppConfirm();

	// all products
	const { data: allProducts, refetch } = useQuery({
		queryKey: [`all-products`],
		queryFn: async () =>
			await gqlRequest<{
				products: ProductPagination | null;
			}>({
				query: All_Products_Query,
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
				<h2 className='text-3xl font-bold'>All Products</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setProduct(null);
					}}
				>
					<Plus /> Add Products
				</Button>
			</div>
			<DataTable
				columns={productsTableColumns}
				data={
					allProducts?.products?.nodes?.map((product) => ({
						...product,
					})) || []
				}
				ActionCell={({ row }) => (
					<div className='flex gap-2'>
						<Button
							variant={'outline'}
							onClick={() => {
								setOpenEditDrawer(true);
								setProduct(row);
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
							{/* {removeExpense?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)} */}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>

			<DrawerWrapper
				title={'Add Product'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setProduct(null);
				}}
			>
				<ProductForm
					actionType='ADD'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
						setProduct(null);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
