import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/organizations/$orgId/orders-management/all-orders/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_app/organizations/$orgId/orders-management/all-orders"!</div>
  )
}
