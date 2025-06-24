import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/organizations/$orgId/orders-management/pos-sale/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_app/organizations/$orgId/orders-management/pos-sale/"!</div>
  )
}
