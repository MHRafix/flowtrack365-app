import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/organizations/$orgId/organization-settings/plan-features/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_app/organizations/$orgId/organization-settings/plan-features/"!
    </div>
  )
}
