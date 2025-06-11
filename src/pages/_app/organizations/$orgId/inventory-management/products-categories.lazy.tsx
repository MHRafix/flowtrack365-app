import { useAppConfirm } from '@/components/AppConfirm';
import { DataTable } from '@/components/DataTable';
import DrawerWrapper from '@/components/DrawerWrapper';
import { Button } from '@/components/ui/button';
import { ProductCategory, ProductCategoryPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Loader2, PenSquare, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { productCategoryApi } from './~module/api/productCategoryApi';
import { categoryTableColumns } from './~module/components/category-table-cols';
import { CategoryForm } from './~module/components/CategoryForm';
import { Product_Categories_Query } from './~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products-categories'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [isOpenEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
	const [isOpenCreateDrawer, setOpenCreateDrawer] = useState<boolean>(false);
	const [product, setProduct] = useState<ProductCategory | null>(null);
	const [rowId, setRowId] = useState<string>('');
	const [session] = useAtom(userAtom);
	const { show } = useAppConfirm();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['product_categories'],
		queryFn: async () => {
			const res = await gqlRequest<{
				productCategories: ProductCategoryPagination;
			}>({
				query: Product_Categories_Query,
				variables: {
					orgUid: session?.orgUID,
				},
			});

			return res?.productCategories;
		},
	});

	const { removeProductCategory } = productCategoryApi(() => refetch());
	return (
		<div>
			<div className='flex justify-between items-center gap-5 mb-5'>
				<h2 className='text-3xl font-bold'>All Products Categories</h2>
				<Button
					variant={'outline'}
					onClick={() => {
						setOpenCreateDrawer(true);
						setProduct(null);
					}}
				>
					<Plus /> Add Category
				</Button>
			</div>
			<DataTable
				columns={categoryTableColumns}
				data={
					data?.nodes?.map((productCategory) => ({
						...productCategory,
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
									title: 'Are you sure to remove product ?',
									children: (
										<span>Please proceed to complete this action.</span>
									),
									onConfirm() {
										removeProductCategory.mutate(row?._id!);
									},
								});
							}}
							disabled={removeProductCategory?.isPending}
						>
							{removeProductCategory?.isPending && row?._id === rowId && (
								<Loader2 className='animate-spin' />
							)}
							<Trash /> Remove
						</Button>
					</div>
				)}
			/>

			<DrawerWrapper
				title={'Add Category'}
				isOpen={isOpenCreateDrawer}
				onCloseDrawer={() => {
					setOpenCreateDrawer(false);
					setProduct(null);
				}}
			>
				<CategoryForm
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
