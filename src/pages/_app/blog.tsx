import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/blog')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_app/blog"!</div>;
}
