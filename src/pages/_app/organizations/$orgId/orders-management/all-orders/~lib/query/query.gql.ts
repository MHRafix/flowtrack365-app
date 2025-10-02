import { gql } from '@/lib/api-client';

export const All_Orders_By_Organization_Query = gql`
	query OrdersByOrganization($orgUid: String!, $input: OrderListQueryDto) {
		ordersByOrganization(orgUID: $orgUid, input: $input) {
			meta {
				totalCount
			}
			nodes {
				billing {
					name
					email
					phone
					address
					district
				}
				_id
				deliveryFee
				isPaid
				items {
					product {
						title
						code
						model
						orgUID
						regularPrice
						salePrice
						thumbnail {
							bucket
							region
							key
							externalUrl
						}
					}
					quantity
					code
					color
					size
					price
					subtotal
				}
				orgUID
				specialNote
				payment {
					method
					status
					transactionId
					amount
					paidAt
				}
				status
				total
				updatedAt
			}
		}
	}
`;

export const Update_Order_Mutation = gql`
	mutation UpdateOrder($payload: UpdateOrderInput!, $orgUid: String!) {
		updateOrder(payload: $payload, orgUID: $orgUid)
	}
`;
