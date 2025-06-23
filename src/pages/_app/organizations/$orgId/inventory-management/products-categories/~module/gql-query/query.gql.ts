import { gql } from '@/lib/api-client';

export const Product_Categories_Query = gql`
	query ProductCategories(
		$orgUid: String!
		$input: ProductCategoriesListQueryDto
	) {
		productCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
				description
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

export const Create_Product_Category_Mutation = gql`
	mutation CreateProductCategory($payload: CreateProductCategoryInput!) {
		createProductCategory(payload: $payload)
	}
`;

export const Update_Product_Category_Mutation = gql`
	mutation UpdateProductCategory($payload: UpdateProductCategoryInput!) {
		updateProductCategory(payload: $payload) {
			_id
		}
	}
`;

export const Remove_Product_Category_Mutation = gql`
	mutation RemoveProductCategory($id: String!) {
		removeProductCategory(_id: $id) {
			_id
		}
	}
`;
