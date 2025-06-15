import { gql } from '@/lib/api-client';

export const All_Expense_Categories_List_Query = gql`
	query ExpenseCategories(
		$orgUid: String!
		$input: ExpenseCategoryListQueryDto
	) {
		expenseCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				title
				description
				createdAt
				updatedAt
				orgUID
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

export const Create_Expense_Category_Mutation = gql`
	mutation CreateExpenseCategory($input: CreateExpenseCategoryInput!) {
		createExpenseCategory(input: $input)
	}
`;

export const Update_Expense_Category_Mutation = gql`
	mutation UpdateExpenseCategory($payload: UpdateExpenseCategoryInput!) {
		updateExpenseCategory(payload: $payload)
	}
`;

export const Remove_Expense_Category_Mutation = gql`
	mutation RemoveExpenseCategory($input: CommonMatchInput!) {
		removeExpenseCategory(input: $input)
	}
`;
