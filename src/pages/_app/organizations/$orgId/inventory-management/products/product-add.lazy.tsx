import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
	'/_app/organizations/$orgId/inventory-management/products/product-add'
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello
			"/_app/organizations/$orgId/inventory-management/products/product-action"!
		</div>
	);
}
