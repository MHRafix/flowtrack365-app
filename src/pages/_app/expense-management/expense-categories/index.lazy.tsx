import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/_app/expense-management/expense-categories/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/expense-management/expense-categories/"!</div>
}
