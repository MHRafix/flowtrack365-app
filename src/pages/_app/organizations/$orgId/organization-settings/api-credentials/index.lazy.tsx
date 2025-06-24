import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/organizations/$orgId/organization-settings/api-credentials/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_app/organizations/$orgId/organization-settings/api-credentials/"!
    </div>
  )
}
