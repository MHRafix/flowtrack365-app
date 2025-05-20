import { gqlRequest } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Task_List_Query } from './~module/gql-query/query.gql';

export const Route = createFileRoute(
	'/_app/organizations/$orgId/task-management/'
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery({
		queryKey: ['tasklist'],
		queryFn: async () => {
			const res = await gqlRequest<{ taskList: any }>({
				query: Task_List_Query,
			});
			return res.taskList;
		},
	});
	return (
		<div>
			{data?.nodes?.map((task: any, idx: any) => (
				<div key={idx}>{task?.taskId}</div>
			))}
		</div>
	);
}
