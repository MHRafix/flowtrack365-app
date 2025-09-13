import { gql } from '@/lib/api-client';

export const All_Orders_By_Organization_Query = gql`
	query OrdersByOrganization($orgUid: String!) {
		ordersByOrganization(orgUID: $orgUid) {
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
						_id
						title
						thumbnail {
							bucket
							region
							key
							externalUrl
						}

						createdAt
						updatedAt
					}
					quantity
					code
					color
					size
					price
					subtotal
				}
				orgUID
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
