import { gql } from '@/lib/api-client';

export const Task_List_Query = gql`
	query TaskList($input: TaskListQueryDto) {
		taskList(input: $input) {
			nodes {
				_id
				taskCreatedBy {
					_id
					name
					email
					phone
					avatar
					role
				}
				client {
					_id
					name
					address
					email
					phone
				}
				taskDetails {
					taskName
					taskAssignTo {
						_id
						employeeDetails {
							_id
							name
							email
							phone
							avatar
							role
						}
						organizations {
							organization {
								_id
								name
								tagline
								orgUID
								businessEmail
								businessPhone
								address
								cover {
									bucket
									region
									key
									externalUrl
								}
								Logo {
									bucket
									region
									key
									externalUrl
								}
								employees {
									_id
								}
								owner {
									_id
								}
								createdAt
								updatedAt
							}
							role
							salary
						}
					}
					taskDescription
					issuesDescription
				}
				taskId
				files {
					fileUrl
				}
				totalBillAmount
				paidBillAmount
				dueAmount
				progressStatus
				paymentStatus
				deadLine
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;
