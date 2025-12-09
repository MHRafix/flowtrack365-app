import { gql } from '@/lib/api-client';

export const All_Daily_Activities_Query = gql`
	query ActivitiesByOrgAndUser(
		$orgUid: String!
		$userId: String!
		$input: ActivityListQueryDto
	) {
		activitiesByOrgAndUser(orgUID: $orgUid, userId: $userId, input: $input) {
			nodes {
				_id
				orgUID
				ebadah {
					namajWithJamath
					extraNamaj
					ishraq
					tahajjud
					tilwat
					hadith
					readingBook
					waqiyah
					mulk
					translation
				}
				exercise {
					pushUp
					squats
					seatUp
					running
					jumpingJack
					plank
					dumbbleCurl
					others
				}
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

export const Create_Daily_Activity_Mutation = gql`
	mutation CreateActivity($payload: CreateDailyActivityDto!) {
		createActivity(payload: $payload) {
			_id
		}
	}
`;

export const Update_Daily_Activity_Mutation = gql`
	mutation UpdateActivity(
		$payload: UpdateDailyActivityInputDto!
		$orgUid: String!
		$userId: String!
	) {
		updateActivity(payload: $payload, orgUID: $orgUid, userId: $userId)
	}
`;

export const Remove_Daily_Activity_Mutation = gql`
	mutation RemoveActivity($id: String!) {
		removeActivity(_id: $id) {
			_id
		}
	}
`;
