import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { ProductPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Copy, Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { productApi } from './~module/api/productApi';
import { ProductForm } from './~module/components/all-products/ProductForm';
import { productsTableColumns } from './~module/components/all-products/products-table-cols';
import { All_Products_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
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

	const { createProduct, removeProduct } = productApi(() => refetch());

	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Products</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
					}}
				>
					<Plus /> Add Product
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
								createProduct.mutate({
									title: row?.title,
									category: row?.category?._id!,
									code: row?.code,
									model: row?.model!,
									regularPrice: row?.regularPrice,
									stock: row?.stock,
									thumbnail: { externalUrl: row?.thumbnail?.externalUrl },
									// @ts-ignore
									discountAmount: row?.discountAmount,
									orgUID: session?.orgUID!,
								});
							}}
						>
							<Copy /> Make Clone
						</Button>
						<Link
							to={`/organizations/$orgId/inventory-management/products/product-edit/$productId`}
							params={{ orgId: session?.orgUID!, productId: row?._id! }}
						>
							<Button variant={'outline'}>
								<PenSquare /> Edit
							</Button>
						</Link>
						<Button
							variant={'destructive'}
							onClick={() => {
								setRowId(row?._id!);
								show({
									title: 'Are you sure to remove product ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeProduct.mutate(row?._id!);
									},
								});
							}}
							disabled={removeProduct?.isPending}
						>
							{removeProduct?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
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
				}}
			>
				<ProductForm
					actionType='ADD'
					onRefetch={() => {
						refetch();
					}}
					onCloseDrawer={() => {
						setOpenCreateDrawer(false);
					}}
				/>
			</DrawerWrapper>
		</div>
	);
}
