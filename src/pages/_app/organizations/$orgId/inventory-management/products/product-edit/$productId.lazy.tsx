import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	BrandPagination,
	Product,
	ProductCategoryPagination,
	UnitPagination,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { UseMutationResult, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { productApi } from '../~module/api/productApi';
import Assignments from '../~module/components/edit-product/Assignments';
import BasicInformation from '../~module/components/edit-product/BasicInformation';
import ManageStock from '../~module/components/edit-product/ManageStock';
import MediaFiles from '../~module/components/edit-product/MediaFiles';
import PriceAssignment from '../~module/components/edit-product/PriceAssignment';
import {
	All_Product_Brands_For_DropDown_List_Query,
	All_Product_Categories_For_DropDown_List_Query,
	All_Product_Units_For_DropDown_List_Query,
	Product_details_Query,
} from '../~module/gql-query/query.gql';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products/product-edit/$productId'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);

	const { productId } = Route.useParams();

	// all brands
	const { data: brands } = useQuery({
		queryKey: [`all-brands-dropdown-${productId}`],
		queryFn: async () =>
			await gqlRequest<{
				brands: BrandPagination | null;
			}>({
				query: All_Product_Brands_For_DropDown_List_Query,
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

	// all units
	const { data: units } = useQuery({
		queryKey: [`all-units-dropdown-${productId}`],
		queryFn: async () =>
			await gqlRequest<{
				units: UnitPagination | null;
			}>({
				query: All_Product_Units_For_DropDown_List_Query,
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

	const {
		data,
		isLoading,
		refetch: productDetailsRefetch,
	} = useQuery({
		queryKey: [`product_details_${productId}`],
		queryFn: () =>
			gqlRequest<{
				product: Product;
			}>({
				query: Product_details_Query,
				variables: {
					id: productId,
					orgUid: session?.orgUID,
				},
			}),
		enabled: Boolean(productId && session?.orgUID),
	});

	const { data: productCategories } = useQuery({
		queryKey: ['all-product-category-for-dropdown-for-assignment'],
		queryFn: async () =>
			await gqlRequest<{
				productCategories: ProductCategoryPagination;
			}>({
				query: All_Product_Categories_For_DropDown_List_Query,
				variables: {
					orgUid: session?.orgUID,
				},
			}),
		enabled: Boolean(session?.orgUID),
	});

	// api
	const { updateProduct } = productApi(() => productDetailsRefetch());

	return (
		<div className='!w-full xl:!w-8/12 bg-slate-100 dark:bg-slate-800 p-2 lg:p-5 rounded-md'>
			{isLoading ? (
				<Skeleton className='h-[50px] w-[320px] rounded-md bg-slate-200 dark:bg-slate-900' />
			) : (
				<h1 className='text-2xl font-medium'>
					Edit Product -{' '}
					<span className='text-teal-500'>{data?.product?.title}</span>
				</h1>
			)}
			<Tabs defaultValue='basic_information' className='mt-5 lg:w-full'>
				<TabsList className='w-full border grid grid-cols-2 lg:grid-cols-5 gap-3 h-auto'>
					<TabsTrigger value='basic_information'>Basic Information</TabsTrigger>
					<TabsTrigger value='price'>Price</TabsTrigger>
					<TabsTrigger value='media'>Media</TabsTrigger>
					<TabsTrigger value='assignment'>Assignments</TabsTrigger>
					<TabsTrigger value='manage_stock'>Manage Stock</TabsTrigger>
				</TabsList>
				{isLoading ? (
					<Skeleton className='h-[400px] rounded-md bg-slate-200 dark:bg-slate-900' />
				) : (
					<div>
						<TabsContent value='basic_information'>
							<BasicInformation
								product={data?.product!}
								updateProduct={updateProduct as UseMutationResult}
							/>
						</TabsContent>
						<TabsContent value='price'>
							<PriceAssignment
								product={data?.product!}
								updateProduct={updateProduct as UseMutationResult}
							/>
						</TabsContent>
						<TabsContent value='media'>
							<MediaFiles
								product={data?.product!}
								updateProduct={updateProduct as UseMutationResult}
							/>
						</TabsContent>
						<TabsContent value='assignment'>
							<Assignments
								product={data?.product!}
								productCategories={productCategories?.productCategories?.nodes!}
								updateProduct={updateProduct as UseMutationResult}
								brands={brands?.brands?.nodes!}
								units={units?.units?.nodes!}
							/>
						</TabsContent>
						<TabsContent value='manage_stock'>
							<ManageStock
								product={data?.product!}
								onRefetch={productDetailsRefetch}
							/>
						</TabsContent>
					</div>
				)}
			</Tabs>
		</div>
	);
}
