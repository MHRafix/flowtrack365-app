import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/get-started/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/get-started/"!</div>
}
