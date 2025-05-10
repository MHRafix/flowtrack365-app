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

export const Create_Expense_Mutation = gql`
	mutation CreateExpenseCalculation($input: ExpenseCalculationInput!) {
		createExpenseCalculation(input: $input)
	}
`;

export const Update_Expense_Mutation = gql`
	mutation UpdateExpenseCalculation(
		$updateExpenseCalculationInput: UpdateExpenseCalculationInput!
	) {
		updateExpenseCalculation(
			updateExpenseCalculationInput: $updateExpenseCalculationInput
		)
	}
`;

export const All_Expense_Categories_List_Query = gql`
	query AllExpenseCategories($input: ExpenseCategoryListQueryDto) {
		expenseCategories(input: $input) {
			nodes {
				_id
				title
				description
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
