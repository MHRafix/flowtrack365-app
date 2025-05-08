import { gql } from '@/lib/api-client';

export const All_Expense_List_Query = gql`
	query ExpenseCalculationList($input: ExpenseListQueryDto) {
		expenseCalculationList(input: $input) {
			nodes {
				_id
				title
				amount
				description
				category {
					_id
					title
				}
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
