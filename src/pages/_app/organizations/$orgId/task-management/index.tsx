import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/organizations/$orgId/task-management/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/$orgId/task-management/"!</div>
}
