import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, ProductCategoryPagination } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import {
	All_Product_Categories_For_DropDown_List_Query,
	Product_details_Query,
} from '../../~module/gql-query/query.gql';
import Assignments from './~module/components/Assignments';
import BasicInformation from './~module/components/BasicInformation';
import ManageStock from './~module/components/ManageStock';
import MediaFiles from './~module/components/MediaFiles';
import PriceAssignment from './~module/components/PriceAssignment';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products/product-edit/$productId'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);

	const { productId } = Route.useParams();

	const { data, isLoading } = useQuery({
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

	return (
		<div className='md:w-8/12 bg-slate-100 dark:bg-slate-800 p-5 rounded-md'>
			{isLoading ? (
				<Skeleton className='h-[50px] w-[400px] rounded-md bg-slate-200 dark:bg-slate-900' />
			) : (
				<h1 className='text-2xl font-medium'>
					Edit Product -{' '}
					<span className='text-teal-500'>{data?.product?.title}</span>
				</h1>
			)}
			<Tabs defaultValue='basic_information' className='mt-5 md:w-full'>
				<TabsList className='w-full border'>
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
							<BasicInformation product={data?.product!} />
						</TabsContent>
						<TabsContent value='price'>
							<PriceAssignment product={data?.product!} />
						</TabsContent>
						<TabsContent value='media'>
							<MediaFiles product={data?.product!} />
						</TabsContent>
						<TabsContent value='assignment'>
							<Assignments
								product={data?.product!}
								productCategories={productCategories?.productCategories?.nodes!}
							/>
						</TabsContent>
						<TabsContent value='manage_stock'>
							<ManageStock product={data?.product!} />
						</TabsContent>
					</div>
				)}
			</Tabs>
		</div>
	);
}
