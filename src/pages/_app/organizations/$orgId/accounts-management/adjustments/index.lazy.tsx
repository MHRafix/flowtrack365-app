import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/organizations/$orgId/accounts-management/adjustments/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_app/organizations/$orgId/accounts-management/adjustments/"!
    </div>
  )
}
