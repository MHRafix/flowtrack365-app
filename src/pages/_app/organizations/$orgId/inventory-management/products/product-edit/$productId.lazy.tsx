import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products/product-edit/$productId'
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='!w-screen'>
			<Tabs defaultValue='basic_information' className='!w-8/12'>
				<TabsList className='w-full'>
					<TabsTrigger value='basic_information'>Basic Information</TabsTrigger>
					<TabsTrigger value='price'>Price</TabsTrigger>
					<TabsTrigger value='media'>Media</TabsTrigger>
					<TabsTrigger value='assignment'>Assignments</TabsTrigger>
					<TabsTrigger value='manage_stock'>Manage Stock</TabsTrigger>
				</TabsList>
				<TabsContent value='basic_information'>basic_information</TabsContent>
				<TabsContent value='price'>price</TabsContent>
				<TabsContent value='media'>media</TabsContent>
				<TabsContent value='assignment'>assignment</TabsContent>
				<TabsContent value='manage_stock'>manage_stock</TabsContent>
			</Tabs>
		</div>
	);
}
