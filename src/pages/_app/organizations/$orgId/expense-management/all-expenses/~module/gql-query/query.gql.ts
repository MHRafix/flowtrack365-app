import { gql } from '@/lib/api-client';

export const All_Expense_List_Query = gql`
	query ExpenseCalculationList(
		$input: ExpenseListQueryDto
		$creatorId: String!
		$orgUid: String!
	) {
		expenseCalculationList(
			input: $input
			creatorId: $creatorId
			orgUID: $orgUid
		) {
			nodes {
				_id
				title
				description
				amount
				category {
					_id
					title
					description
					createdAt
					updatedAt
				}
				fromAccount {
					_id
				}

				statement {
					_id
				}
				creator {
					_id
				}
				orgUID
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

export const Remove_Expense_Mutation = gql`
	mutation RemoveExpense($input: CommonMatchInput!) {
		removeExpense(input: $input)
	}
`;

export const All_Expense_Categories_For_DropDown_List_Query = gql`
	query ExpenseCategories(
		$orgUid: String!
		$input: ExpenseCategoryListQueryDto
	) {
		expenseCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				title
			}
		}
	}
`;
